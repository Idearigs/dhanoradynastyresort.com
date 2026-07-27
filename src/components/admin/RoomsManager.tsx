import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronDown, ImagePlus, Loader2, Pencil, Plus, Star, Trash2 } from "lucide-react";
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
import { roomsApi, type Room } from "@/lib/admin-api";
import { Field, ErrorBox, Loading } from "./ui";
import { UploadField } from "./UploadField";

type Draft = {
  no: string;
  name: string;
  tag: string;
  price: string;
  beds: string;
  view: string;
  description: string;
  sortOrder: number;
  isPublished: boolean;
};

const draftFrom = (r?: Room): Draft => ({
  no: r?.no ?? "",
  name: r?.name ?? "",
  tag: r?.tag ?? "",
  price: r?.price == null ? "" : String(r.price),
  beds: r?.beds ?? "",
  view: r?.view ?? "",
  description: r?.description ?? "",
  sortOrder: r?.sortOrder ?? 0,
  isPublished: r?.isPublished ?? true,
});

export function RoomsManager() {
  const qc = useQueryClient();
  const rooms = useQuery({ queryKey: ["admin", "rooms"], queryFn: roomsApi.all });

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Room | null>(null);
  const [draft, setDraft] = useState<Draft>(draftFrom());

  const invalidate = () => qc.invalidateQueries({ queryKey: ["admin", "rooms"] });

  const save = useMutation({
    mutationFn: async () => {
      const payload: Partial<Room> = {
        no: draft.no.trim(),
        name: draft.name.trim(),
        tag: draft.tag.trim() || null,
        price: draft.price.trim() === "" ? null : Number(draft.price),
        beds: draft.beds.trim() || null,
        view: draft.view.trim() || null,
        description: draft.description.trim() || null,
        sortOrder: draft.sortOrder,
        isPublished: draft.isPublished,
      };
      if (editing) return roomsApi.update(editing.id, payload);
      return roomsApi.create(payload);
    },
    onSuccess: () => {
      toast.success(editing ? "Room updated" : "Room added");
      setOpen(false);
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const del = useMutation({
    mutationFn: (id: number) => roomsApi.remove(id),
    onSuccess: () => {
      toast.success("Room deleted");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const openNew = () => {
    setEditing(null);
    setDraft(draftFrom());
    setOpen(true);
  };
  const openEdit = (r: Room) => {
    setEditing(r);
    setDraft(draftFrom(r));
    setOpen(true);
  };

  if (rooms.isLoading) return <Loading />;
  if (rooms.error) return <ErrorBox message={rooms.error.message} />;

  const list = rooms.data ?? [];

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {list.length} {list.length === 1 ? "room" : "rooms"}
        </p>
        <Button size="sm" onClick={openNew} className="bg-[#441C1A] hover:bg-[#2E1210]">
          <Plus className="size-4" /> Add room
        </Button>
      </div>

      <div className="space-y-3">
        {list.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            onEdit={() => openEdit(room)}
            onDelete={() => {
              if (window.confirm(`Delete room ${room.no} (${room.name})?`)) del.mutate(room.id);
            }}
            onImagesChanged={invalidate}
          />
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? `Edit room ${editing.no}` : "Add room"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Room number">
                <Input
                  value={draft.no}
                  onChange={(e) => setDraft((d) => ({ ...d, no: e.target.value }))}
                  placeholder="e.g. 101"
                />
              </Field>
              <Field label="Tag" hint="e.g. VIP, Deluxe">
                <Input
                  value={draft.tag}
                  onChange={(e) => setDraft((d) => ({ ...d, tag: e.target.value }))}
                />
              </Field>
            </div>

            <Field label="Name">
              <Input
                value={draft.name}
                onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                placeholder="e.g. VIP Family Room"
              />
            </Field>

            <Field label="Description">
              <Textarea
                value={draft.description}
                onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
                rows={3}
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Beds">
                <Input
                  value={draft.beds}
                  onChange={(e) => setDraft((d) => ({ ...d, beds: e.target.value }))}
                  placeholder="e.g. King + Single Bed"
                />
              </Field>
              <Field label="View">
                <Input
                  value={draft.view}
                  onChange={(e) => setDraft((d) => ({ ...d, view: e.target.value }))}
                  placeholder="e.g. Garden View"
                />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Price / night (Rs)">
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
                checked={draft.isPublished}
                onCheckedChange={(v) => setDraft((d) => ({ ...d, isPublished: v }))}
              />
              <span className="text-sm">Published (visible on the public rooms page)</span>
            </label>

            {!editing && (
              <p className="rounded-md bg-muted px-3 py-2 text-xs text-muted-foreground">
                Save the room first, then add photos from its card.
              </p>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => save.mutate()}
              disabled={save.isPending || draft.no.trim() === "" || draft.name.trim() === ""}
              className="bg-[#441C1A] hover:bg-[#2E1210]"
            >
              {save.isPending && <Loader2 className="size-4 animate-spin" />}
              {editing ? "Save changes" : "Add room"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function RoomCard({
  room,
  onEdit,
  onDelete,
  onImagesChanged,
}: {
  room: Room;
  onEdit: () => void;
  onDelete: () => void;
  onImagesChanged: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const cover = room.images[0]?.src;

  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <div className="flex items-center gap-4 p-3">
        <div className="size-16 shrink-0 overflow-hidden rounded-md bg-muted">
          {cover ? (
            <img src={cover} alt="" className="size-full object-cover" />
          ) : (
            <div className="grid size-full place-items-center text-xs text-muted-foreground">
              no photo
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-2 font-medium">
            <span className="font-serif text-[#441C1A]">{room.no}</span>
            {room.name}
            {room.tag && (
              <span className="rounded bg-[#C9A227]/15 px-1.5 py-0.5 text-xs text-[#8a6d10]">
                {room.tag}
              </span>
            )}
            {!room.isPublished && (
              <span className="rounded bg-red-100 px-1.5 py-0.5 text-xs text-red-700">hidden</span>
            )}
          </p>
          <p className="text-sm text-muted-foreground">
            {room.price == null ? "—" : `Rs ${room.price.toLocaleString("en-LK")} / night`} ·{" "}
            {room.beds ?? "—"}
          </p>
        </div>
        <div className="flex shrink-0 gap-1">
          <Button size="sm" variant="ghost" onClick={() => setExpanded((v) => !v)}>
            Photos ({room.images.length})
            <ChevronDown
              className={`size-4 transition-transform ${expanded ? "rotate-180" : ""}`}
            />
          </Button>
          <Button size="icon" variant="ghost" onClick={onEdit}>
            <Pencil className="size-4" />
          </Button>
          <Button size="icon" variant="ghost" onClick={onDelete}>
            <Trash2 className="size-4 text-red-600" />
          </Button>
        </div>
      </div>

      {expanded && <RoomPhotos room={room} onChanged={onImagesChanged} />}
    </div>
  );
}

function RoomPhotos({ room, onChanged }: { room: Room; onChanged: () => void }) {
  const [src, setSrc] = useState("");

  const add = useMutation({
    mutationFn: () =>
      roomsApi.addImage(room.id, {
        src: src.trim(),
        isCover: room.images.length === 0,
        sortOrder: room.images.length,
      }),
    onSuccess: () => {
      toast.success("Photo added");
      setSrc("");
      onChanged();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: (imageId: number) => roomsApi.removeImage(room.id, imageId),
    onSuccess: () => {
      toast.success("Photo removed");
      onChanged();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="border-t bg-muted/30 p-3">
      <div className="mb-3 flex flex-wrap gap-3">
        {room.images.length === 0 && (
          <p className="text-sm text-muted-foreground">No photos yet.</p>
        )}
        {room.images.map((img) => (
          <div key={img.id} className="relative">
            <div className="size-24 overflow-hidden rounded-md border bg-muted">
              <img src={img.src} alt={img.alt ?? ""} className="size-full object-cover" />
            </div>
            {img.isCover && (
              <span className="absolute left-1 top-1 flex items-center gap-0.5 rounded bg-[#441C1A] px-1 py-0.5 text-[10px] text-[#C9A227]">
                <Star className="size-2.5" /> cover
              </span>
            )}
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Remove this photo?")) remove.mutate(img.id);
              }}
              className="absolute right-1 top-1 grid size-6 place-items-center rounded-full bg-black/60 text-white hover:bg-red-600"
              aria-label="Remove photo"
            >
              <Trash2 className="size-3.5" />
            </button>
          </div>
        ))}
      </div>

      <div className="rounded-md border bg-background p-3">
        <p className="mb-2 flex items-center gap-1.5 text-sm font-medium">
          <ImagePlus className="size-4" /> Add a photo
        </p>
        <UploadField value={src} onChange={setSrc} dir="rooms" />
        <Button
          size="sm"
          className="mt-2 bg-[#441C1A] hover:bg-[#2E1210]"
          disabled={src.trim() === "" || add.isPending}
          onClick={() => add.mutate()}
        >
          {add.isPending && <Loader2 className="size-4 animate-spin" />}
          Add to room
        </Button>
      </div>
    </div>
  );
}
