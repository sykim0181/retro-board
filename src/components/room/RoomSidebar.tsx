import { LucideIcon, SquarePenIcon, MessageSquareTextIcon } from "lucide-react";
import { NavLink, useLoaderData, useParams } from "react-router";
import { useCallback } from "react";
import Avvvatars from "avvvatars-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { TRoom } from "@/types/types";
import { getUser } from "@/utils";
import RoomSidebarDiscussSub from "./RoomSidebarDiscussSub";

type TItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
};

const items: TItem[] = [
  {
    title: "Reflect",
    url: "reflect",
    icon: SquarePenIcon,
  },
  {
    title: "Discuss",
    url: "discuss",
    icon: MessageSquareTextIcon,
  },
];

const RoomSidebar = () => {
  const params = useParams();
  const roomId = params.roomId;

  if (!roomId) {
    throw new Error("Invalid room id");
  }

  const room = useLoaderData() as TRoom;
  const user = getUser();

  const getSubItems = useCallback(async (item: TItem) => {
    switch (item.title) {
      case "Discuss": {
        return <RoomSidebarDiscussSub />;
      }
      default: {
        return null;
      }
    }
  }, []);

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <span className="font-bold">{room.name}</span>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink to={`/room/${roomId}/${item.url}`}>
                    {({ isActive }) => (
                      <SidebarMenuButton isActive={isActive}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    )}
                  </NavLink>
                  {getSubItems(item)}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

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
