import { LiveObject } from "@liveblocks/client";
import { useMutation, useStorage } from "@liveblocks/react";
import { useMemo } from "react";
import { TEmoji, TReaction } from "@/types/types";
import { getUser } from "@/utils";

interface useDiscussTaskCardProps {
  taskId: string;
}

const useDiscussTaskCard = (props: useDiscussTaskCardProps) => {
  const { taskId } = props;

  const task = useStorage((root) => root.tasks.get(taskId));

  const reactions = useMemo(() => {
    let result: TReaction[] = [];
    task?.reactions.forEach((reaction) => {
      result = [...result, reaction];
    });
    return result;
  }, [task]);

  const handleEmojiClicked = useMutation(
    ({ storage }, emoji: TEmoji) => {
      const taskReactions = storage.get("tasks").get(taskId)?.get("reactions");

      if (taskReactions === undefined) {
        return;
      }

      const user = getUser();
      const emojiReactions = taskReactions.get(emoji.unified);
      if (
        emojiReactions !== undefined &&
        emojiReactions.get("users").some((val) => val.name === user.name)
      ) {
        // 이모지 취소
        const newUsers = emojiReactions
          .get("users")
          .filter((val) => val.name !== user.name);
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
    [taskId]
  );

  return {
    task,
    reactions,
    handleEmojiClicked,
  };
};

export default useDiscussTaskCard;
