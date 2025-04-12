import Avvvatars from "avvvatars-react";
import { ClientSideSuspense } from "@liveblocks/react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "../../ui/sidebar";
import useRoomSidebar from "@/hooks/useRoomSidebar";
import RoomSidebarContent from "./RoomSidebarContent";

const RoomSidebar = () => {
  const { room, user, isOwnerOfRoom } = useRoomSidebar();

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <span className="font-bold">{room.name}</span>
      </SidebarHeader>
      <ClientSideSuspense fallback={<SidebarContent />}>
        <RoomSidebarContent room={room} isOwnerOfRoom={isOwnerOfRoom} />
      </ClientSideSuspense>
      <SidebarFooter>
        <div className="flex gap-[.5rem] items-center">
          <Avvvatars value={user.name} />
          <span className="text-[0.9rem]">{user.name}</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default RoomSidebar;
