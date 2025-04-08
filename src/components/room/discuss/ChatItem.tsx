import Avvvatars from "avvvatars-react";
import { TChat } from "@/types/types";
import { getDateDiff } from "@/utils";

interface ChatItemProps {
  chat: TChat;
}

const ChatItem = (props: ChatItemProps) => {
  const { chat } = props;

  return (
    <li className="flex gap-[1rem] items-center">
      <Avvvatars value={chat.user.name} />
      <div>
        <div className="flex gap-[0.5rem]">
          <span className="text-[0.8rem]">{chat.user.name}</span>
          <span className="text-[0.8rem] text-gray-500">
            {getDateDiff(chat.createdAt)}
          </span>
        </div>
        <div className="text-[0.9rem]">{chat.content}</div>
      </div>
    </li>
  );
};

export default ChatItem;
