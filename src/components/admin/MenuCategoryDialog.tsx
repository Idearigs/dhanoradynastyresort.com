import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
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
import { menuApi, type MenuCategory } from "@/lib/admin-api";
import { Field } from "./ui";
import { UploadField } from "./UploadField";

/**
 * Edit a menu category's banner image (shown behind the section heading on the
 * public menu), its name, and whether the whole category is published.
 */
export function CategoryDialog({
  category,
  onClose,
  onSaved,
}: {
  category: MenuCategory | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [name, setName] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [isPublished, setIsPublished] = useState(true);

  // Reset the form whenever a different category is opened.
  useEffect(() => {
    if (!category) return;
    setName(category.name);
    setImageSrc(category.imageSrc ?? "");
    setImageAlt(category.imageAlt ?? "");
    setIsPublished(category.isPublished);
  }, [category]);

  const save = useMutation({
    mutationFn: () =>
      menuApi.updateCategory(category!.id, {
        name: name.trim(),
        imageSrc: imageSrc.trim() || null,
        imageAlt: imageAlt.trim() || null,
        isPublished,
      }),
    onSuccess: () => {
      toast.success("Category updated");
      onSaved();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <Dialog open={category !== null} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit category{category ? ` — ${category.name}` : ""}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Field label="Name">
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Field>

          <Field label="Banner image" hint="Shown behind the category heading on the public menu.">
            <UploadField value={imageSrc} onChange={setImageSrc} dir="menu" />
          </Field>

          {imageSrc.trim() !== "" && (
            <Field label="Banner alt text" hint="Describes the banner for search engines & screen readers.">
              <Input value={imageAlt} onChange={(e) => setImageAlt(e.target.value)} />
            </Field>
          )}

          <label className="flex items-center gap-3">
            <Switch checked={isPublished} onCheckedChange={setIsPublished} />
            <span className="text-sm">Published (category visible on the public menu)</span>
          </label>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => save.mutate()}
            disabled={save.isPending || name.trim() === ""}
            className="bg-[#441C1A] hover:bg-[#2E1210]"
          >
            {save.isPending && <Loader2 className="size-4 animate-spin" />}
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
