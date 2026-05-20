import { useState } from "react";
import { useRoomContext } from "@/context/RoomContext";

interface useTaskTextareaProps {
  taskId: string;
}

const useTaskTextarea = (props: useTaskTextareaProps) => {
  const { taskId } = props;
  const { state, send } = useRoomContext();

  const taskContent = state.tasks[taskId]?.content ?? "";
  const [draft, setDraft] = useState<string>(taskContent);

  const updateTaskContent = () => {
    send({ type: "UPDATE_TASK", taskId, content: draft });
  };

  return { draft, setDraft, updateTaskContent };
};

export default useTaskTextarea;
