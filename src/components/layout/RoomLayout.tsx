import { RoomProvider } from "@liveblocks/react/suspense";
import { Outlet, useLoaderData, useParams } from "react-router";
import { LiveList, LiveMap } from "@liveblocks/client";
import { SidebarProvider } from "../ui/sidebar";
import RoomSidebar from "../room/sidebar/RoomSidebar";
import { Card } from "../ui/card";
import { Storage } from "@/types/liveblocks";
import { TRoom } from "@/types/types";

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
      <SidebarProvider>
        <RoomSidebar />

        <main className="flex-1 h-dvh p-[0.5rem] box-border">
          <Card className="h-full p-[2rem] box-border">
            <Outlet context={{ room }} />
          </Card>
        </main>
      </SidebarProvider>
    </RoomProvider>
  );
};

export default RoomLayout;
