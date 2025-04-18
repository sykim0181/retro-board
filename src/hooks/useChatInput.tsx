import { LiveList, LiveObject } from "@liveblocks/client";
import { useMutation } from "@liveblocks/react";
import { RefObject, useState } from "react";
import { Chat } from "@/types/liveblocks";
import { useAppSelector } from "@/store/store";

interface useChatInputProps {
  topicIdx: number;
  chatListRef: RefObject<HTMLUListElement | null>;
}

const useChatInput = (props: useChatInputProps) => {
  const { topicIdx, chatListRef } = props;

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

      const topicChats = storage.get("topics").get(topicIdx)?.get("chats");
      const newReplies: LiveList<Chat> = new LiveList([]);
      const newChat: Chat = new LiveObject({
        user,
        content: draft,
        createdAt: new Date().toISOString(),
        replies: newReplies,
      });
      topicChats?.push(newChat);

      setDraft("");

      setTimeout(() => {
        chatListRef.current?.scrollTo({
          top: chatListRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 0);
    },
    [topicIdx, draft, user]
  );

  return {
    draft,
    onChangeInput,
    onKeyDownInput,
    sendChat,
  };
};

export default useChatInput;
