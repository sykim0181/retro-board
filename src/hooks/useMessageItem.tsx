import { useStorage } from "@liveblocks/react/suspense";

interface useMessageItemProps {
  messageId: string;
}

const useMessageItem = (props: useMessageItemProps) => {
  const { messageId } = props;

  const message = useStorage((root) => root.messages.get(messageId));

  return {
    message,
  };
};

export default useMessageItem;
