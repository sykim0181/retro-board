import { useAppSelector } from "@/store/store";
import { useStorage } from "@liveblocks/react/suspense";
import { useMemo } from "react";
import usePhase from "./usePhase";

interface useTaskItemProps {
  taskId: string;
}

const useTaskItem = (props: useTaskItemProps) => {
  const { taskId } = props;

  const task = useStorage((root) => root.tasks.get(taskId));
  const taskUser = useStorage((root) => root.tasks.get(taskId)?.user);
  const taskContent = useStorage((root) => root.tasks.get(taskId)?.content);

  const user = useAppSelector((state) => state.user.user);
  const { phase } = usePhase();

  const isEditable = useMemo(() => {
    if (phase !== "DISCUSS") {
      return false;
    }
    if (taskUser?.id !== user.id) {
      return false;
    }
    return true;
  }, [taskUser, user, phase]);

  return {
    task,
    taskContent,
    isEditable,
  };
};

export default useTaskItem;
