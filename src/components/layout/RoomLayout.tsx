import { RoomProvider } from "@liveblocks/react/suspense";
import { Outlet, useLoaderData, useParams } from "react-router";
import { LiveList, LiveMap } from "@liveblocks/client";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import RoomSidebar from "../room/sidebar/RoomSidebar";
import { Card } from "../ui/card";
import { Storage } from "@/types/liveblocks";
import { TRoom } from "@/types/types";
import { cn } from "@/lib/utils";

const initialStorage: Storage = {
  board: new LiveMap([
    ["start", new LiveList([])],
    ["end", new LiveList([])],
    ["continue", new LiveList([])],
  ]),
  cards: new LiveMap(),
  tasks: new LiveList([]),
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
    <RoomProvider id={roomId} initialStorage={initialStorage}>
      <SidebarProvider className="h-dvh">
        <RoomSidebar />
        <SidebarInset
          className={cn(["overflow-hidden"])}
        >
          <Card 
            className={cn(["h-full", "p-[1rem]"])}
          >
            <Outlet context={{ room }} />
          </Card>
        </SidebarInset>
      </SidebarProvider>
    </RoomProvider>
  );
};

export default RoomLayout;
