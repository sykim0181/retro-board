import { useStorage } from "@liveblocks/react/suspense";

interface useChatListProps {
  taskIdx: number;
}

const useChatList = (props: useChatListProps) => {
  const { taskIdx } = props;

  const chats = useStorage(root => root.tasks.at(taskIdx)?.chats) ?? [];

  return {
    chats
  }
};

export default useChatList;
