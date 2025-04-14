import { ClientSideSuspense } from "@liveblocks/react";
import { useMemo } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "../../ui/sidebar";
import RoomSidebarContent from "./RoomSidebarContent";
import { useLoaderData } from "react-router";
import { TRoom } from "@/types/types";
import { useAppSelector } from "@/store/store";
import UserAvatar from "@/components/common/UserAvatar";

const RoomSidebar = () => {
  const room = useLoaderData() as TRoom;
  const user = useAppSelector((state) => state.user.user);
  const isOwnerOfRoom = useMemo(() => user.id === room.ownerId, [user, room]);

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
          <UserAvatar userName={user.name} />
          <span className="text-[0.9rem]">{user.name}</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default RoomSidebar;
