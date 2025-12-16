import MessageItem from "./MessageItem";
import { ComponentPropsWithRef } from "react";
import TaskItem from "./TaskItem";
import { useStorage } from "@liveblocks/react";

interface ChatListProps extends ComponentPropsWithRef<"ul"> {
  topicIdx: number;
}

const ChatList = (props: ChatListProps) => {
  const { topicIdx, ref } = props;

  const chats = useStorage(root => root.topics[topicIdx]?.chats) ?? [];

  return (
    <ul
      ref={ref}
      className="h-full flex flex-col gap-[1.5rem] overflow-y-scroll"
    >
      {chats.map((chat) =>
        chat.type === "MESSAGE" ? (
          <MessageItem messageId={chat.id} key={chat.id} />
        ) : (
          <TaskItem taskId={chat.id} key={chat.id} />
        )
      )}
    </ul>
  );
};

export default ChatList;
