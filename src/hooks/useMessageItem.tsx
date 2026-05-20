import { useRoomContext } from "@/context/RoomContext";

interface useMessageItemProps {
  messageId: string;
}

const useMessageItem = (props: useMessageItemProps) => {
  const { messageId } = props;
  const { state } = useRoomContext();
  const message = state.messages[messageId];

  return { message };
};

export default useMessageItem;
