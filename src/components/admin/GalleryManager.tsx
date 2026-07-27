import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { EyeOff, Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { galleryApi, type GalleryCategory, type GalleryImage } from "@/lib/admin-api";
import { Field, ErrorBox, Loading } from "./ui";
import { UploadField } from "./UploadField";

const CATEGORIES: GalleryCategory[] = ["Rooms", "Dining", "Grounds", "Wellness"];

type Draft = {
  category: GalleryCategory;
  caption: string;
  src: string;
  alt: string;
  sortOrder: number;
  isPublished: boolean;
};

const emptyDraft = (): Draft => ({
  category: "Rooms",
  caption: "",
  src: "",
  alt: "",
  sortOrder: 0,
  isPublished: true,
});

export function GalleryManager() {
  const qc = useQueryClient();
  const images = useQuery({ queryKey: ["admin", "gallery"], queryFn: galleryApi.all });

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<GalleryImage | null>(null);
  const [draft, setDraft] = useState<Draft>(emptyDraft());

  const invalidate = () => qc.invalidateQueries({ queryKey: ["admin", "gallery"] });

  const save = useMutation({
    mutationFn: async () => {
      const payload: Partial<GalleryImage> = {
        category: draft.category,
        caption: draft.caption.trim() || null,
        src: draft.src.trim(),
        alt: draft.alt.trim() || null,
        sortOrder: draft.sortOrder,
        isPublished: draft.isPublished,
      };
      if (editing) return galleryApi.update(editing.id, payload);
      return galleryApi.create(payload);
    },
    onSuccess: () => {
      toast.success(editing ? "Image updated" : "Image added");
      setOpen(false);
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const del = useMutation({
    mutationFn: (id: number) => galleryApi.remove(id),
    onSuccess: () => {
      toast.success("Image deleted");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const openNew = () => {
    setEditing(null);
    setDraft(emptyDraft());
    setOpen(true);
  };
  const openEdit = (img: GalleryImage) => {
    setEditing(img);
    setDraft({
      category: img.category,
      caption: img.caption ?? "",
      src: img.src,
      alt: img.alt ?? "",
      sortOrder: img.sortOrder,
      isPublished: img.isPublished,
    });
    setOpen(true);
  };

  if (images.isLoading) return <Loading />;
  if (images.error) return <ErrorBox message={images.error.message} />;

  const list = images.data ?? [];

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {list.length} {list.length === 1 ? "image" : "images"}
        </p>
        <Button size="sm" onClick={openNew} className="bg-[#441C1A] hover:bg-[#2E1210]">
          <Plus className="size-4" /> Add image
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {list.map((img) => (
          <figure key={img.id} className="group relative overflow-hidden rounded-lg border bg-card">
            <div className="aspect-[4/3] overflow-hidden bg-muted">
              <img src={img.src} alt={img.alt ?? ""} className="size-full object-cover" />
            </div>
            {!img.isPublished && (
              <span className="absolute left-2 top-2 flex items-center gap-1 rounded bg-black/70 px-1.5 py-0.5 text-xs text-white">
                <EyeOff className="size-3" /> hidden
              </span>
            )}
            <figcaption className="flex items-center justify-between gap-2 p-2">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{img.caption ?? "—"}</p>
                <p className="text-xs text-muted-foreground">{img.category}</p>
              </div>
              <div className="flex shrink-0">
                <Button size="icon" variant="ghost" onClick={() => openEdit(img)}>
                  <Pencil className="size-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => {
                    if (window.confirm("Delete this image?")) del.mutate(img.id);
                  }}
                >
                  <Trash2 className="size-4 text-red-600" />
                </Button>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit image" : "Add image"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Field label="Image">
              <UploadField
                value={draft.src}
                onChange={(src) => setDraft((d) => ({ ...d, src }))}
                dir="gallery"
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Category">
                <Select
                  value={draft.category}
                  onValueChange={(v) => setDraft((d) => ({ ...d, category: v as GalleryCategory }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Sort order">
                <Input
                  type="number"
                  value={draft.sortOrder}
                  onChange={(e) => setDraft((d) => ({ ...d, sortOrder: Number(e.target.value) }))}
                />
              </Field>
            </div>

            <Field label="Caption" hint="Shown on hover in the gallery.">
              <Input
                value={draft.caption}
                onChange={(e) => setDraft((d) => ({ ...d, caption: e.target.value }))}
              />
            </Field>
            <Field label="Alt text" hint="Describes the image for search engines & screen readers.">
              <Input
                value={draft.alt}
                onChange={(e) => setDraft((d) => ({ ...d, alt: e.target.value }))}
              />
            </Field>

            <label className="flex items-center gap-3">
              <Switch
                checked={draft.isPublished}
                onCheckedChange={(v) => setDraft((d) => ({ ...d, isPublished: v }))}
              />
              <span className="text-sm">Published (visible on the public gallery)</span>
            </label>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => save.mutate()}
              disabled={save.isPending || draft.src.trim() === ""}
              className="bg-[#441C1A] hover:bg-[#2E1210]"
            >
              {save.isPending && <Loader2 className="size-4 animate-spin" />}
              {editing ? "Save changes" : "Add image"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
