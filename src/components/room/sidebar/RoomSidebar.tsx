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
import AppLogo from "@/components/common/AppLogo";

const RoomSidebar = () => {
  const room = useLoaderData() as TRoom;
  const user = useAppSelector((state) => state.user.user);
  const isOwnerOfRoom = useMemo(() => user.id === room.ownerId, [user, room]);

  return (
    <Sidebar variant="inset">
      <SidebarHeader className="h-[60px] flex justify-center flex-col border-b">
        <AppLogo />
      </SidebarHeader>
      <SidebarContent>
        <div className="px-[0.5rem] py-[0.75rem]">
          <span className="font-bold text-sm">{room.name}</span>
        </div>
        <RoomSidebarContent room={room} isOwnerOfRoom={isOwnerOfRoom} />
      </SidebarContent>
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
