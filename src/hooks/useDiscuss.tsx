import { useStorage } from "@liveblocks/react/suspense";
import { useParams } from "react-router";

const useDiscuss = () => {
  const params = useParams();

  if (!params.taskIdx) {
    throw new Error("Invalid Task Index.");
  }

  const taskIdx = Number(params.taskIdx) - 1;

  const card = useStorage((root) => root.tasks.at(taskIdx)?.card);

  if (card === undefined) {
    throw new Error("Not Available Task.");
  }

  return {
    taskIdx,
    card,
  };
};

export default useDiscuss;
