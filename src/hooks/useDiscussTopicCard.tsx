import { LiveObject } from "@liveblocks/client";
import { useMutation, useStorage } from "@liveblocks/react/suspense";
import { useMemo } from "react";
import { TEmoji, TReaction } from "@/types/types";
import { useAppSelector } from "@/store/store";

interface useDiscussTopicCardProps {
  topicIdx: number;
}

const useDiscussTopicCard = (props: useDiscussTopicCardProps) => {
  const { topicIdx } = props;

  const reactionMap = useStorage((root) => root.topics.at(topicIdx)?.reactions);
  const user = useAppSelector((state) => state.user.user);

  const reactions = useMemo(() => {
    let result: TReaction[] = [];
    reactionMap?.forEach((reaction) => {
      result = [...result, reaction];
    });
    return result;
  }, [reactionMap]);

  const handleEmojiClicked = useMutation(
    ({ storage }, emoji: TEmoji) => {
      const topic = storage.get("topics").get(topicIdx);
      const topicReactions = topic?.get("reactions");

      if (topicReactions === undefined) {
        return;
      }

      const emojiReactions = topicReactions.get(emoji.unified);
      if (
        emojiReactions !== undefined &&
        emojiReactions.get("users").some((val) => val.id === user.id)
      ) {
        // 이모지 취소
        const newUsers = emojiReactions
          .get("users")
          .filter((val) => val.id !== user.id);
        if (newUsers.length === 0) {
          topicReactions.delete(emoji.unified);
        } else {
          emojiReactions.set("users", newUsers);
        }
      } else {
        // 이모지 전송
        if (emojiReactions === undefined) {
          const newReaction = new LiveObject({
            emoji,
            users: [user],
          });
          topicReactions.set(emoji.unified, newReaction);
        } else {
          emojiReactions.set("users", [...emojiReactions.get("users"), user]);
        }
      }
    },
    [topicIdx, user]
  );

  return {
    reactions,
    handleEmojiClicked,
  };
};

export default useDiscussTopicCard;
