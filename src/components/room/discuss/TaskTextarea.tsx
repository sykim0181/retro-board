import { Textarea } from "@/components/ui/textarea";
import useTaskTextarea from "@/hooks/useTaskTextarea";

interface TaskTextareaProps {
  taskId: string;
}

const TaskTextarea = (props: TaskTextareaProps) => {
  const { taskId } = props;

  const { draft, setDraft, updateTaskContent } = useTaskTextarea({ taskId });

  return (
    <Textarea
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={updateTaskContent}
      placeholder="Describe a Task"
      className="border-0 resize-none shadow-none p-0 placeholder:text-gray-300"
    />
  );
};

export default TaskTextarea;
