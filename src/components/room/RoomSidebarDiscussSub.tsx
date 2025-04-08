import { useStorage } from "@liveblocks/react/suspense";
import { NavLink, useParams } from "react-router";
import { TCard, TColumnType } from "@/types/types";
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

  const taskList = useStorage((root) => {
    let ids: string[] = [];
    const board = root.board;
    const columns: TColumnType[] = ["start", "end", "continue"];
    columns.forEach((column) => {
      const cards = board.get(column) ?? [];
      ids = [...ids, ...cards];
    });

    const tasks = root.tasks;
    let result: TCard[] = [];
    ids.forEach((id) => {
      const task = tasks.get(id);
      if (task !== undefined) {
        result = [...result, task.card as TCard];
      }
    });
    return result;
  });

  return (
    <SidebarMenuSub>
      {taskList.map((task, idx) => (
        <SidebarMenuSubItem key={task.id}>
          <NavLink to={`/room/${roomId}/discuss/${idx + 1}`}>
            {({ isActive }) => (
              <SidebarMenuSubButton isActive={isActive}>
                <span>{task.content}</span>
              </SidebarMenuSubButton>
            )}
          </NavLink>
        </SidebarMenuSubItem>
      ))}
    </SidebarMenuSub>
  );
};

export default RoomSidebarDiscussSub;
