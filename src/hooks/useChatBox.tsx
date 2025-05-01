import { useAppSelector } from "@/store/store";
import { Task } from "@/types/liveblocks";
import { TChat } from "@/types/types";
import { LiveObject } from "@liveblocks/client";
import { useMutation } from "@liveblocks/react/suspense";
import { nanoid } from "nanoid";

interface useChatBoxProps {
  topicIdx: number;
}

const useChatBox = (props: useChatBoxProps) => {
  const { topicIdx } = props;

  const user = useAppSelector((state) => state.user.user);

  const addTask = useMutation(
    ({ storage }) => {
      const newTaskId = nanoid();
      const newChat: TChat = {
        id: newTaskId,
        type: "TASK",
      };
      const newTask: Task = new LiveObject({
        id: newTaskId,
        user,
        content: "",
        createdAt: new Date().toISOString(),
      });

      storage.get("tasks").set(newTaskId, newTask);
      const topic = storage.get("topics").get(topicIdx);
      topic?.get("chats").push(newChat);
    },
    [topicIdx, user]
  );

  return {
    addTask,
  };
};

export default useChatBox;
