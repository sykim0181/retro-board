import { useMemo } from "react";
import { TEmoji, TReaction } from "@/types/types";
import { useAppSelector } from "@/store/store";
import { useRoomContext } from "@/context/RoomContext";

interface useDiscussTopicCardProps {
  topicIdx: number;
}

const useDiscussTopicCard = (props: useDiscussTopicCardProps) => {
  const { topicIdx } = props;
  const { state, send } = useRoomContext();
  const user = useAppSelector((state) => state.user.user);

  const reactionMap = state.topics[topicIdx]?.reactions ?? {};

  const reactions = useMemo<TReaction[]>(
    () => Object.values(reactionMap),
    [reactionMap]
  );

  const handleEmojiClicked = (emoji: TEmoji) => {
    const existing = reactionMap[emoji.unified];
    const alreadyReacted = existing?.users.some((u) => u.id === user.id);

    if (alreadyReacted) {
      send({
        type: "REMOVE_REACTION",
        topicIndex: topicIdx,
        emojiUnified: emoji.unified,
        userId: user.id,
      });
    } else {
      send({ type: "ADD_REACTION", topicIndex: topicIdx, emoji, user });
    }
  };

  return { reactions, handleEmojiClicked };
};

export default useDiscussTopicCard;
