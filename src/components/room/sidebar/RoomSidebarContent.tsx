import { NavLink } from "react-router";
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

  const baseurl = `/room/${room.id}`;

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                {item.url ? (
                  <NavLink to={`${baseurl}/${item.url}`}>
                    {({ isActive }) => (
                      <SidebarMenuButton
                        isActive={isActive}
                        onClick={(e) => onClickMenuItem(e, item)}
                        disabled={item.disabled}
                      >
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    )}
                  </NavLink>
                ) : (
                  <SidebarMenuButton
                    onClick={(e) => onClickMenuItem(e, item)}
                    disabled={item.disabled}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                )}
                {item.items?.length && (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        {item.url ? (
                          <NavLink to={`${baseurl}/${item.url}`}>
                            {({ isActive }) => (
                              <SidebarMenuSubButton isActive={isActive}>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                              </SidebarMenuSubButton>
                            )}
                          </NavLink>
                        ) : (
                          <SidebarMenuSubButton>
                            {item.icon && <item.icon />}
                            <span>{item.title}</span>
                          </SidebarMenuSubButton>
                        )}
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
};

export default RoomSidebarContent;
