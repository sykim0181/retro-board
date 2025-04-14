import { useLocation, useNavigate } from "react-router";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import useRoomSidebarContent from "@/hooks/useRoomSidebarContent";
import { TRoom } from "@/types/types";
import InviteDialog from "./InviteDialog";
import { cn } from "@/lib/utils";

interface RoomSidebarContentProps {
  room: TRoom;
  isOwnerOfRoom: boolean;
}

const RoomSidebarContent = (props: RoomSidebarContentProps) => {
  const { room, isOwnerOfRoom } = props;

  const { items, onClickMenuItem } = useRoomSidebarContent({
    room,
    isOwnerOfRoom,
  });

  const location = useLocation();
  const navigate = useNavigate();

  const baseurl = `/room/${room.id}`;

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  isActive={location.pathname === `${baseurl}/${item.url}`}
                  onClick={(e) => onClickMenuItem(e, item)}
                  className={cn([
                    item.disabled
                      ? "cursor-default hover:bg-transparent hover:text-black"
                      : "cursor-pointer",
                  ])}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
                {item.items?.length && (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton
                          isActive={
                            location.pathname === `${baseurl}/${item.url}`
                          }
                          onClick={() => {
                            if (!item.disabled && item.url) {
                              navigate(`${baseurl}/${item.url}`);
                            }
                          }}
                          className={cn([
                            item.disabled
                              ? "cursor-default hover:bg-transparent hover:text-black"
                              : "cursor-pointer",
                          ])}
                        >
                          {item.icon && <item.icon />}
                          <span>{item.title}</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarGroup className="mt-auto">
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <InviteDialog roomId={room.id} />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
};

export default RoomSidebarContent;
