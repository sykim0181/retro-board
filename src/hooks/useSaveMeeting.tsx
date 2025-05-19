import { TMessage, TTask, TTopic } from "@/types/types";
import { useRoom } from "@liveblocks/react/suspense";
import { useCallback } from "react";
import useSaveMeetingMutation from "./useSaveMeetingMutation";
import { TopicDB } from "@/types/dbTypes";

interface useSaveMeetingProps {
  roomId: string;
}

const useSaveMeeting = (props: useSaveMeetingProps) => {
  const { roomId } = props;

  const room = useRoom();

  const { mutate } = useSaveMeetingMutation({ roomId });

  const saveMeeting = useCallback(
    (onSuccess?: () => void, onError?: (error: Error) => void) => {
      const snapshot = room.getStorageSnapshot();
      if (!snapshot) {
        return;
      }

      const msgMap = snapshot.get("messages");
      const taskMap = snapshot.get("tasks");
      const topicList = snapshot.get("topics").toImmutable() as TTopic[];
      const newTopicList = topicList.map((topic) => {
        const newChats: (TMessage | TTask)[] = [];
        topic.chats.forEach((chat) => {
          if (chat.type === "MESSAGE") {
            const content = msgMap.get(chat.id);
            if (content) {
              newChats.push(content.toImmutable() as TMessage);
            }
          } else {
            const content = taskMap.get(chat.id);
            if (content) {
              newChats.push(content.toImmutable() as TTask);
            }
          }
        });

        const newTopic: TopicDB = {
          card: topic.card,
          reactions: Array.from(topic.reactions.values()),
          chats: newChats,
        };
        return newTopic;
      });

      const taskList = Array.from(
        snapshot.get("tasks").toImmutable().values()
      ) as TTask[];

      mutate(
        { topicList: newTopicList, taskList },
        {
          onSuccess,
          onError,
        }
      );
    },
    [room, mutate]
  );

  return {
    saveMeeting,
  };
};

export default useSaveMeeting;
