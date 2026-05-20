import { useAppSelector } from "@/store/store";
import { useRoomContext } from "@/context/RoomContext";
import { useMemo } from "react";

interface useTaskItemProps {
  taskId: string;
}

const useTaskItem = (props: useTaskItemProps) => {
  const { taskId } = props;
  const { state } = useRoomContext();

  const task = state.tasks[taskId];
  const taskUser = task?.user;
  const user = useAppSelector((s) => s.user.user);
  const phase = state.phase;

  const isEditable = useMemo(() => {
    if (phase !== "DISCUSS") return false;
    if (taskUser?.id !== user.id) return false;
    return true;
  }, [taskUser, user, phase]);

  return { task, isEditable };
};

export default useTaskItem;
