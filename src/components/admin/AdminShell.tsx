import { LogOut, UtensilsCrossed, Images, BedDouble } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAdminAuth } from "./useAdminAuth";
import { MenuManager } from "./MenuManager";
import { GalleryManager } from "./GalleryManager";
import { RoomsManager } from "./RoomsManager";

export function AdminShell() {
  const { user, logout } = useAdminAuth();

  return (
    <div className="min-h-screen bg-[#F7F2E7] text-[#1A1A1A]">
      <header className="sticky top-0 z-20 border-b border-[#441C1A]/15 bg-[#441C1A] text-[#F7F2E7]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div>
            <p className="font-serif text-lg leading-none">Dhanora Dynasty</p>
            <p className="text-xs text-[#F7F2E7]/60">Content admin</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-[#F7F2E7]/70 sm:inline">{user?.email}</span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => logout()}
              className="border-[#C9A227]/40 bg-transparent text-[#F7F2E7] hover:bg-[#C9A227] hover:text-[#2E1210]"
            >
              <LogOut className="size-4" /> Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <Tabs defaultValue="menu">
          <TabsList className="mb-6">
            <TabsTrigger value="menu">
              <UtensilsCrossed className="mr-2 size-4" /> Menu
            </TabsTrigger>
            <TabsTrigger value="gallery">
              <Images className="mr-2 size-4" /> Gallery
            </TabsTrigger>
            <TabsTrigger value="rooms">
              <BedDouble className="mr-2 size-4" /> Rooms
            </TabsTrigger>
          </TabsList>

          <TabsContent value="menu">
            <MenuManager />
          </TabsContent>
          <TabsContent value="gallery">
            <GalleryManager />
          </TabsContent>
          <TabsContent value="rooms">
            <RoomsManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
