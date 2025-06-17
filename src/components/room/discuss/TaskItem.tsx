import UserAvatar from "@/components/common/UserAvatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import useTaskItem from "@/hooks/useTaskItem";
import TaskTextarea from "./TaskTextarea";
import { getDateDiff } from "@/utils/date";

interface TaskItemProps {
  taskId: string;
}

const TaskItem = (props: TaskItemProps) => {
  const { taskId } = props;

  const { task, taskContent, isEditable } = useTaskItem({ taskId });

  if (!task) {
    return null;
  }

  return (
    <li className="flex gap-[1rem] w-full">
      <UserAvatar userName={task.user.name} />
      <div className="flex-1 flex flex-col gap-[0.5rem]">
        <div className="flex gap-[0.5rem]">
          <span className="text-[0.8rem]">{task.user.name}</span>
          <span className="text-[0.8rem] text-gray-500">added a Task</span>
        </div>
        <Card className="w-full gap-[0.4rem] p-[0.6rem]">
          <CardHeader>
            <span className="text-[0.8rem] text-gray-500">
              created {getDateDiff(task.createdAt)}
            </span>
          </CardHeader>
          <CardContent className="text-[0.9rem]">
            {isEditable ? (
              <TaskTextarea taskId={taskId} />
            ) : (
              <div>{taskContent}</div>
            )}
          </CardContent>
        </Card>
      </div>
    </li>
  );
};

export default TaskItem;
