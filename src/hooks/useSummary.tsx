import { TTask } from "@/types/types";
import { useStorage } from "@liveblocks/react/suspense";
import { useMemo } from "react";

const useSummary = () => {
  const topics = useStorage((root) => root.topics);
  const tasks = useStorage((root) => root.tasks);

  const taskCnt = tasks.size;

  const groupedTasks = useMemo(() => {
    const map = new Map<string, TTask[]>(); // key: 사용자, value: 사용자에게 할당된 task들
    for (const [_, value] of tasks) {
      const userName = value.user.name;
      if (map.has(userName)) {
        map.get(userName)?.push(value);
      } else {
        map.set(userName, [value]);
      }
    }
    return map;
  }, [tasks]);

  return {
    topics,
    taskCnt,
    groupedTasks,
  };
};

export default useSummary;
