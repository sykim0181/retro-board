import { ArrowUpIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import useMessageInput from "@/hooks/useMessageInput";
import { RefObject } from "react";
import { useAppSelector } from "@/store/store";
import UserAvatar from "@/components/common/UserAvatar";

interface MessageInputProps {
  topicIdx: number;
  chatListRef: RefObject<HTMLUListElement | null>;
}

const MessageInput = (props: MessageInputProps) => {
  const { topicIdx, chatListRef } = props;

  const { draft, onChangeInput, onKeyDownInput, sendMessage } = useMessageInput(
    {
      topicIdx,
      chatListRef,
    }
  );
  const user = useAppSelector((state) => state.user.user);

  return (
    <div className="flex gap-[1rem] py-[.7rem] px-[1rem]">
      <UserAvatar userName={user.name} />
      <Input
        className="flex-1 text-[0.9rem]"
        value={draft}
        onChange={onChangeInput}
        onKeyDown={onKeyDownInput}
      />
      <button
        className="bg-gray-400 hover:opacity-80 text-white rounded-[50%] w-[32px] h-[32px] flex justify-center items-center cursor-pointer"
        onClick={sendMessage}
      >
        <ArrowUpIcon width="1rem" />
      </button>
    </div>
  );
};

export default MessageInput;
