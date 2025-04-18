import { useStorage } from "@liveblocks/react/suspense";

interface useChatListProps {
  topicIdx: number;
}

const useChatList = (props: useChatListProps) => {
  const { topicIdx } = props;

  const chats = useStorage(root => root.topics[topicIdx]?.chats) ?? [];

  return {
    chats
  }
};

export default useChatList;
