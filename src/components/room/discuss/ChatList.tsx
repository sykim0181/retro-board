import useChatList from "@/hooks/useChatList";
import ChatItem from "./ChatItem";
import { TChat } from "@/types/types";
import { ComponentPropsWithRef } from "react";

interface ChatListProps extends ComponentPropsWithRef<"ul"> {
  taskIdx: number;
}

const ChatList = (props: ChatListProps) => {
  const { taskIdx, ref } = props;

  const { chats } = useChatList({ taskIdx });

  return (
    <ul
      ref={ref} 
      className="h-full flex flex-col gap-[1.5rem] overflow-y-scroll"
    >
      {chats.map((chat, idx) => (
        <ChatItem key={`chat-item-${idx}`} chat={chat as TChat} />
      ))}
    </ul>
  );
}

export default ChatList;
