import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ImageIcon, Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { menuApi, type MenuCategory, type MenuItem } from "@/lib/admin-api";
import { Field, Loading, ErrorBox } from "./ui";
import { UploadField } from "./UploadField";
import { CategoryDialog } from "./MenuCategoryDialog";

type Draft = {
  categoryId: number;
  group: string;
  name: string;
  description: string;
  price: string;
  imageSrc: string;
  imageAlt: string;
  isAvailable: boolean;
  sortOrder: number;
};

const emptyDraft = (categoryId: number): Draft => ({
  categoryId,
  group: "",
  name: "",
  description: "",
  price: "",
  imageSrc: "",
  imageAlt: "",
  isAvailable: true,
  sortOrder: 0,
});

export function MenuManager() {
  const qc = useQueryClient();
  const categories = useQuery({ queryKey: ["admin", "menu", "categories"], queryFn: menuApi.categories });
  const items = useQuery({ queryKey: ["admin", "menu", "items"], queryFn: () => menuApi.items() });

  const [editing, setEditing] = useState<MenuItem | null>(null);
  const [creating, setCreating] = useState(false);
  const [draft, setDraft] = useState<Draft>(emptyDraft(0));
  const [editCategory, setEditCategory] = useState<MenuCategory | null>(null);

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["admin", "menu", "items"] });
  };

  const save = useMutation({
    mutationFn: async () => {
      const payload: Partial<MenuItem> = {
        categoryId: draft.categoryId,
        group: draft.group.trim() || null,
        name: draft.name.trim(),
        description: draft.description.trim() || null,
        price: draft.price.trim() === "" ? null : Number(draft.price),
        imageSrc: draft.imageSrc.trim() || null,
        imageAlt: draft.imageAlt.trim() || null,
        isAvailable: draft.isAvailable,
        sortOrder: draft.sortOrder,
      };
      if (editing) return menuApi.updateItem(editing.id, payload);
      return menuApi.createItem(payload);
    },
    onSuccess: () => {
      toast.success(editing ? "Dish updated" : "Dish added");
      closeDialog();
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const del = useMutation({
    mutationFn: (id: number) => menuApi.deleteItem(id),
    onSuccess: () => {
      toast.success("Dish deleted");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const openNew = (categoryId: number) => {
    setEditing(null);
    setDraft(emptyDraft(categoryId));
    setCreating(true);
  };
  const openEdit = (item: MenuItem) => {
    setEditing(item);
    setDraft({
      categoryId: item.categoryId,
      group: item.group ?? "",
      name: item.name,
      description: item.description ?? "",
      price: item.price === null ? "" : String(item.price),
      imageSrc: item.imageSrc ?? "",
      imageAlt: item.imageAlt ?? "",
      isAvailable: item.isAvailable,
      sortOrder: item.sortOrder,
    });
    setCreating(true);
  };
  const closeDialog = () => setCreating(false);

  const byCategory = useMemo(() => {
    const map = new Map<number, MenuItem[]>();
    for (const it of items.data ?? []) {
      const list = map.get(it.categoryId) ?? [];
      list.push(it);
      map.set(it.categoryId, list);
    }
    return map;
  }, [items.data]);

  if (categories.isLoading || items.isLoading) {
    return <Loading />;
  }
  if (categories.error || items.error) {
    return <ErrorBox message={(categories.error ?? items.error)?.message} />;
  }

  const cats = categories.data ?? [];

  return (
    <div className="space-y-8">
      {cats.map((cat: MenuCategory) => {
        const list = byCategory.get(cat.id) ?? [];
        return (
          <section key={cat.id} className="rounded-lg border bg-card">
            <div className="flex items-center justify-between gap-3 border-b px-4 py-3">
              <div className="flex min-w-0 items-center gap-3">
                {/* Category banner thumbnail (shown behind the section heading on the public menu). */}
                <div className="hidden size-12 shrink-0 overflow-hidden rounded-md border bg-muted sm:grid sm:place-items-center">
                  {cat.imageSrc ? (
                    <img src={cat.imageSrc} alt={cat.imageAlt ?? ""} className="size-full object-cover" />
                  ) : (
                    <ImageIcon className="size-5 text-muted-foreground" />
                  )}
                </div>
                <h2 className="min-w-0 truncate font-serif text-lg text-[#441C1A]">
                  {cat.name}
                  <span className="ml-2 text-sm font-sans text-muted-foreground">
                    {list.length} {list.length === 1 ? "dish" : "dishes"}
                  </span>
                </h2>
              </div>
              <div className="flex shrink-0 gap-2">
                <Button size="sm" variant="ghost" onClick={() => setEditCategory(cat)}>
                  <ImageIcon className="size-4" /> Banner
                </Button>
                <Button size="sm" variant="outline" onClick={() => openNew(cat.id)}>
                  <Plus className="size-4" /> Add dish
                </Button>
              </div>
            </div>
            <ul className="divide-y">
              {list.length === 0 && (
                <li className="px-4 py-3 text-sm text-muted-foreground">No dishes yet.</li>
              )}
              {list.map((item) => (
                <li key={item.id} className="flex items-center gap-3 px-4 py-2.5">
                  <div className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-md border bg-muted">
                    {item.imageSrc ? (
                      <img src={item.imageSrc} alt="" className="size-full object-cover" />
                    ) : (
                      <ImageIcon className="size-4 text-muted-foreground/60" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-2 truncate font-medium">
                      {item.name}
                      {item.group && (
                        <span className="rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                          {item.group}
                        </span>
                      )}
                      {!item.isAvailable && (
                        <span className="rounded bg-red-100 px-1.5 py-0.5 text-xs text-red-700">
                          hidden
                        </span>
                      )}
                    </p>
                    {item.description && (
                      <p className="truncate text-sm text-muted-foreground">{item.description}</p>
                    )}
                  </div>
                  <span className="w-20 shrink-0 text-right text-sm tabular-nums text-muted-foreground">
                    {item.price === null ? "—" : `Rs ${item.price.toLocaleString("en-LK")}`}
                  </span>
                  <div className="flex shrink-0 gap-1">
                    <Button size="icon" variant="ghost" onClick={() => openEdit(item)}>
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        if (window.confirm(`Delete "${item.name}"?`)) del.mutate(item.id);
                      }}
                    >
                      <Trash2 className="size-4 text-red-600" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <Dialog open={creating} onOpenChange={(o) => !o && closeDialog()}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit dish" : "Add dish"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Field label="Category">
              <Select
                value={String(draft.categoryId)}
                onValueChange={(v) => setDraft((d) => ({ ...d, categoryId: Number(v) }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {cats.map((c) => (
                    <SelectItem key={c.id} value={String(c.id)}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field label="Name">
              <Input
                value={draft.name}
                onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                placeholder="e.g. Grilled Chicken"
              />
            </Field>

            <Field label="Group (optional)" hint="Sub-heading within the category, e.g. “Sri Lankan”.">
              <Input
                value={draft.group}
                onChange={(e) => setDraft((d) => ({ ...d, group: e.target.value }))}
              />
            </Field>

            <Field label="Description (optional)">
              <Textarea
                value={draft.description}
                onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
                rows={2}
              />
            </Field>

            <Field label="Dish photo (optional)" hint="Falls back to the category banner if left empty.">
              <UploadField
                value={draft.imageSrc}
                onChange={(src) => setDraft((d) => ({ ...d, imageSrc: src }))}
                dir="menu"
              />
            </Field>

            {draft.imageSrc.trim() !== "" && (
              <Field label="Photo alt text" hint="Describes the photo for search engines & screen readers.">
                <Input
                  value={draft.imageAlt}
                  onChange={(e) => setDraft((d) => ({ ...d, imageAlt: e.target.value }))}
                  placeholder={draft.name || "e.g. Grilled chicken with garlic rice"}
                />
              </Field>
            )}

            <div className="grid grid-cols-2 gap-4">
              <Field label="Price (Rs, optional)" hint="Not shown on the public site.">
                <Input
                  type="number"
                  min={0}
                  value={draft.price}
                  onChange={(e) => setDraft((d) => ({ ...d, price: e.target.value }))}
                />
              </Field>
              <Field label="Sort order">
                <Input
                  type="number"
                  value={draft.sortOrder}
                  onChange={(e) => setDraft((d) => ({ ...d, sortOrder: Number(e.target.value) }))}
                />
              </Field>
            </div>

            <label className="flex items-center gap-3">
              <Switch
                checked={draft.isAvailable}
                onCheckedChange={(v) => setDraft((d) => ({ ...d, isAvailable: v }))}
              />
              <span className="text-sm">Visible on the public menu</span>
            </label>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>
              Cancel
            </Button>
            <Button
              onClick={() => save.mutate()}
              disabled={save.isPending || draft.name.trim() === "" || draft.categoryId === 0}
              className="bg-[#441C1A] hover:bg-[#2E1210]"
            >
              {save.isPending && <Loader2 className="size-4 animate-spin" />}
              {editing ? "Save changes" : "Add dish"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <CategoryDialog
        category={editCategory}
        onClose={() => setEditCategory(null)}
        onSaved={() => {
          setEditCategory(null);
          qc.invalidateQueries({ queryKey: ["admin", "menu", "categories"] });
        }}
      />
    </div>
  );
}

