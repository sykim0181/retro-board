import { LiveList, LiveObject } from "@liveblocks/client";
import { useMutation } from "@liveblocks/react";
import { useState } from "react";
import { Chat } from "@/types/liveblocks";
import { getUser } from "@/utils";

interface useChatInputProps {
  taskIdx: number;
}

const useChatInput = (props: useChatInputProps) => {
  const { taskIdx } = props;

  const [draft, setDraft] = useState("");

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDraft(e.target.value);
  };

  const onKeyDownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendChat();
    }
  };

  const user = getUser();

  const sendChat = useMutation(
    ({ storage }) => {
      if (draft === "") {
        return;
      }

      const taskChats = storage.get("tasks").get(taskIdx)?.get("chats");
      const newReplies: LiveList<Chat> = new LiveList([]);
      const newChat: Chat = new LiveObject({
        user,
        content: draft,
        createdAt: new Date().toISOString(),
        replies: newReplies,
      });
      taskChats?.push(newChat);

      setDraft("");
    },
    [taskIdx, draft]
  );

  return {
    user,
    draft,
    onChangeInput,
    onKeyDownInput,
    sendChat,
  };
};

export default useChatInput;
