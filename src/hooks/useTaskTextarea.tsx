import { useMutation, useStorage } from "@liveblocks/react/suspense";
import { useState } from "react";

interface useTaskTextareaProps {
  taskId: string;
}

const useTaskTextarea = (props: useTaskTextareaProps) => {
  const { taskId } = props;

  const taskContent = useStorage((root) => root.tasks.get(taskId)?.content);

  const [draft, setDraft] = useState<string>(taskContent ?? "");

  const setTaskContent = useMutation(
    ({ storage }, draft: string) => {
      const task = storage.get("tasks").get(taskId);
      task?.set("content", draft);
    },
    [taskId]
  );

  const updateTaskContent = () => {
    setTaskContent(draft);
  };

  return {
    draft,
    setDraft,
    updateTaskContent,
  };
};

export default useTaskTextarea;
