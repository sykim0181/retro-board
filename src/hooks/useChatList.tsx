import { useStorage } from "@liveblocks/react/suspense";

interface useChatListProps {
  taskId: string;
}

const useChatList = (props: useChatListProps) => {
  const { taskId } = props;

  const chats = useStorage(root => root.tasks.get(taskId)?.chats) ?? [];

  return {
    chats
  }
};

export default useChatList;
