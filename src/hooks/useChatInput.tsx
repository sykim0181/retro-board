import { LiveList, LiveObject } from "@liveblocks/client";
import { useMutation } from "@liveblocks/react";
import { RefObject, useState } from "react";
import { Chat } from "@/types/liveblocks";
import { useAppSelector } from "@/store/store";

interface useChatInputProps {
  taskIdx: number;
  chatListRef: RefObject<HTMLUListElement | null>;
}

const useChatInput = (props: useChatInputProps) => {
  const { taskIdx, chatListRef } = props;

  const [draft, setDraft] = useState("");

  const user = useAppSelector((state) => state.user.user);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDraft(e.target.value);
  };

  const onKeyDownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendChat();
    }
  };

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

      setTimeout(() => {
        chatListRef.current?.scrollTo({
          top: chatListRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 0);
    },
    [taskIdx, draft, user]
  );

  return {
    draft,
    onChangeInput,
    onKeyDownInput,
    sendChat,
  };
};

export default useChatInput;
