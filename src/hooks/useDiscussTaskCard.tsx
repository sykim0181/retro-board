import { LiveObject } from "@liveblocks/client";
import { useMutation, useStorage } from "@liveblocks/react/suspense";
import { useMemo } from "react";
import { TEmoji, TReaction } from "@/types/types";
import { useAppSelector } from "@/store/store";

interface useDiscussTaskCardProps {
  taskIdx: number;
}

const useDiscussTaskCard = (props: useDiscussTaskCardProps) => {
  const { taskIdx } = props;

  const reactionMap = useStorage((root) => root.tasks.at(taskIdx)?.reactions);
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
      const task = storage.get("tasks").get(taskIdx);
      const taskReactions = task?.get("reactions");

      if (taskReactions === undefined) {
        return;
      }

      const emojiReactions = taskReactions.get(emoji.unified);
      if (
        emojiReactions !== undefined &&
        emojiReactions.get("users").some((val) => val.id === user.id)
      ) {
        // 이모지 취소
        const newUsers = emojiReactions
          .get("users")
          .filter((val) => val.id !== user.id);
        if (newUsers.length === 0) {
          taskReactions.delete(emoji.unified);
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
          taskReactions.set(emoji.unified, newReaction);
        } else {
          emojiReactions.set("users", [...emojiReactions.get("users"), user]);
        }
      }
    },
    [taskIdx, user]
  );

  return {
    reactions,
    handleEmojiClicked,
  };
};

export default useDiscussTaskCard;
