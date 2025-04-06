import { useStorage } from "@liveblocks/react";
import { NavLink, useParams } from "react-router";
import { TBoard, TCard, TColumnType } from "@/types/types";
import {
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../ui/sidebar";

const RoomSidebarDiscussSub = () => {
  const params = useParams();
  const roomId = params.roomId;

  if (!roomId) {
    throw new Error("Invalid room id");
  }

  const cards = useStorage((root) => {
    let result: TCard[] = [];
    const board = root.board as TBoard;
    const columns: TColumnType[] = ["start", "end", "continue"];
    columns.forEach((column) => {
      const items = board[column];
      result = [...result, ...items];
    });
    return result;
  });

  if (!cards || cards.length === 0) {
    return null;
  }

  return (
    <SidebarMenuSub>
      {cards.map((card, idx) => (
        <SidebarMenuSubItem key={card.id}>
          <NavLink to={`/room/${roomId}/discuss/${idx + 1}`}>
            {({ isActive }) => (
              <SidebarMenuSubButton isActive={isActive}>
                <span>{card.content}</span>
              </SidebarMenuSubButton>
            )}
          </NavLink>
        </SidebarMenuSubItem>
      ))}
    </SidebarMenuSub>
  );
};

export default RoomSidebarDiscussSub;
