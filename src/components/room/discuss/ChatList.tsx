import useChatList from "@/hooks/useChatList";
import ChatItem from "./ChatItem";
import { TChat } from "@/types/types";

interface ChatListProps {
  taskIdx: number;
}

const ChatList = (props: ChatListProps) => {
  const { taskIdx } = props;

  const { chats } = useChatList({ taskIdx });

  return (
    <ul className="h-full flex flex-col gap-[1.5rem] overflow-y-scroll">
      {chats.map((chat, idx) => (
        <ChatItem key={`chat-item-${idx}`} chat={chat as TChat} />
      ))}
    </ul>
  );
}

export default ChatList;
