import { RefObject, useState } from "react";
import { TMessage } from "@/types/types";
import { useAppSelector } from "@/store/store";
import { useRoomContext } from "@/context/RoomContext";
import { nanoid } from "nanoid";

interface useMessageInputProps {
  topicIdx: number;
  chatListRef: RefObject<HTMLUListElement | null>;
}

const useMessageInput = (props: useMessageInputProps) => {
  const { topicIdx, chatListRef } = props;
  const { send } = useRoomContext();
  const user = useAppSelector((state) => state.user.user);
  const [draft, setDraft] = useState("");

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDraft(e.target.value);
  };

  const onKeyDownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (draft === "") return;

    const newMessage: TMessage = {
      id: nanoid(),
      user,
      content: draft,
      createdAt: new Date().toISOString(),
    };

    send({ type: "ADD_MESSAGE", topicIndex: topicIdx, message: newMessage });
    setDraft("");

    setTimeout(() => {
      chatListRef.current?.scrollTo({
        top: chatListRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 0);
  };

  return { draft, onChangeInput, onKeyDownInput, sendMessage };
};

export default useMessageInput;
