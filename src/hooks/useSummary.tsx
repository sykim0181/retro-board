import { TMeeting, TTask } from "@/types/types";
import { useMemo } from "react";

interface useSummaryProps {
  meeting: TMeeting;
}

const useSummary = (props: useSummaryProps) => {
  const { meeting } = props;

  const { name, tasks, topics, date } = meeting;

  const taskCnt = tasks.length;

  const groupedTasks = useMemo(() => {
    const map = new Map<string, TTask[]>(); // key: 사용자, value: 사용자에게 할당된 task들
    for (const task of tasks) {
      const userName = task.user.name;
      if (map.has(userName)) {
        map.get(userName)?.push(task);
      } else {
        map.set(userName, [task]);
      }
    }
    return map;
  }, [tasks]);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

  return {
    name,
    topics,
    taskCnt,
    groupedTasks,
    formattedDate,
  };
};

export default useSummary;
