import { ArrowUpIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import useChatInput from "@/hooks/useChatInput";
import { RefObject } from "react";
import { useAppSelector } from "@/store/store";
import UserAvatar from "@/components/common/UserAvatar";

interface ChatInputProps {
  topicIdx: number;
  chatListRef: RefObject<HTMLUListElement | null>;
}

const ChatInput = (props: ChatInputProps) => {
  const { topicIdx, chatListRef } = props;

  const { draft, onChangeInput, onKeyDownInput, sendChat } = useChatInput({
    topicIdx,
    chatListRef,
  });
  const user = useAppSelector((state) => state.user.user);

  return (
    <>
      <UserAvatar userName={user.name} />
      <Input
        className="flex-1 text-[0.9rem]"
        value={draft}
        onChange={onChangeInput}
        onKeyDown={onKeyDownInput}
      />
      <button
        className="bg-gray-400 hover:opacity-80 text-white rounded-[50%] w-[32px] h-[32px] flex justify-center items-center cursor-pointer"
        onClick={sendChat}
      >
        <ArrowUpIcon width="1rem" />
      </button>
    </>
  );
};

export default ChatInput;
