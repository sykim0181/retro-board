import { LiveObject } from "@liveblocks/client";
import { useMutation } from "@liveblocks/react";
import { RefObject, useState } from "react";
import { Message } from "@/types/liveblocks";
import { useAppSelector } from "@/store/store";
import { nanoid } from "nanoid";
import { TChat } from "@/types/types";

interface useMessageInputProps {
  topicIdx: number;
  chatListRef: RefObject<HTMLUListElement | null>;
}

const useMessageInput = (props: useMessageInputProps) => {
  const { topicIdx, chatListRef } = props;

  const [draft, setDraft] = useState("");

  const user = useAppSelector((state) => state.user.user);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDraft(e.target.value);
  };

  const onKeyDownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const addMessage = useMutation(
    ({ storage }, draft: string) => {
      const newMessageId = nanoid();
      const newMessage: Message = new LiveObject({
        id: newMessageId,
        user,
        content: draft,
        createdAt: new Date().toISOString(),
      });
      const newChat: TChat = {
        id: newMessageId,
        type: "MESSAGE",
      };

      storage.get("messages").set(newMessageId, newMessage);
      const topicChats = storage.get("topics").get(topicIdx)?.get("chats");
      topicChats?.push(newChat);
    },
    [topicIdx, user]
  );

  const sendMessage = () => {
    if (draft === "") {
      return;
    }

    addMessage(draft);
    setDraft("");

    setTimeout(() => {
      chatListRef.current?.scrollTo({
        top: chatListRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 0);
  };

  return {
    draft,
    onChangeInput,
    onKeyDownInput,
    sendMessage,
  };
};

export default useMessageInput;
