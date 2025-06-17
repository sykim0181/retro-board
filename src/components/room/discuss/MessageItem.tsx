import UserAvatar from "@/components/common/UserAvatar";
import useMessageItem from "@/hooks/useMessageItem";
import { getDateDiff } from "@/utils/date";

interface MessageItemProps {
  messageId: string;
}

const MessageItem = (props: MessageItemProps) => {
  const { messageId } = props;

  const { message } = useMessageItem({ messageId });

  if (!message) {
    return null;
  }

  return (
    <li className="flex gap-[1rem]">
      <UserAvatar userName={message.user.name} />
      <div>
        <div className="flex gap-[0.5rem]">
          <span className="text-[0.8rem]">{message.user.name}</span>
          <span className="text-[0.8rem] text-gray-500">
            {getDateDiff(message.createdAt)}
          </span>
        </div>
        <div className="text-[0.9rem]">{message.content}</div>
      </div>
    </li>
  );
};

export default MessageItem;
