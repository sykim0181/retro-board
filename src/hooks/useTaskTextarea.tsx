import { useMutation, useStorage } from "@liveblocks/react/suspense";
import { useState } from "react";

interface useTaskTextareaProps {
  taskId: string;
}

const useTaskTextarea = (props: useTaskTextareaProps) => {
  const { taskId } = props;

  const taskContent = useStorage((root) => root.tasks.get(taskId)?.content);

  const [draft, setDraft] = useState<string>(taskContent ?? "");

  const updateTaskContent = useMutation(
    ({ storage }) => {
      const task = storage.get("tasks").get(taskId);
      task?.set("content", draft);
    },
    [taskId, draft]
  );

  return {
    draft,
    setDraft,
    updateTaskContent,
  };
};

export default useTaskTextarea;
