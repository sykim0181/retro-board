import { ClientSideSuspense, RoomProvider } from "@liveblocks/react/suspense";
import { Outlet, useLoaderData, useParams } from "react-router";
import { LiveList, LiveMap } from "@liveblocks/client";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import RoomSidebar from "../room/sidebar/RoomSidebar";
import { Card } from "../ui/card";
import { Storage } from "@/types/liveblocks";
import { TRoom } from "@/types/types";
import { cn } from "@/lib/utils";
import RoomAlert from "../room/common/RoomAlert";
import RoomErrorBoundary from "../room/common/RoomErrorBoundary";
import User from "../room/common/User";

const initialStorage: Storage = {
  board: new LiveMap([
    ["start", new LiveList([])],
    ["stop", new LiveList([])],
    ["continue", new LiveList([])],
  ]),
  cards: new LiveMap(),
  topics: new LiveList([]),
  phase: "REFLECT",
};

const RoomLayout = () => {
  const params = useParams();
  const roomId = params.roomId;

  if (!roomId) {
    throw new Error("Invalid room id");
  }

  const room = useLoaderData() as TRoom;

  return (
    <RoomProvider
      id={roomId}
      initialStorage={initialStorage}
      initialPresence={{
        name: "unknown",
      }}
    >
      <SidebarProvider className="h-dvh">
        <RoomSidebar />
        <SidebarInset className={cn(["overflow-hidden"])}>
          <Card className={cn(["h-full", "p-[1rem]"])}>
            <RoomErrorBoundary>
              <Outlet context={{ room }} />
            </RoomErrorBoundary>
          </Card>
        </SidebarInset>
      </SidebarProvider>

      <ClientSideSuspense fallback={null}>
        <RoomAlert roomId={room.id} />
        <User />
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default RoomLayout;
