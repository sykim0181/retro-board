import { useStorage } from "@liveblocks/react/suspense";
import { useParams } from "react-router";

const useDiscuss = () => {
  const params = useParams();

  if (!params.topicIdx) {
    throw new Error("Invalid Topic Index.");
  }

  const topicIdx = Number(params.topicIdx) - 1;

  const card = useStorage((root) => root.topics.at(topicIdx)?.card);

  if (card === undefined) {
    throw new Error("Not Available Topic.");
  }

  return {
    topicIdx,
    card,
  };
};

export default useDiscuss;
