import Avvvatars from "avvvatars-react";
import { ArrowUpIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import useChatInput from "@/hooks/useChatInput";

interface ChatInputProps {
  taskIdx: number;
}

const ChatInput = (props: ChatInputProps) => {
  const { taskIdx } = props;

  const { user, draft, onChangeInput, onKeyDownInput, sendChat } = useChatInput(
    { taskIdx }
  );

  return (
    <>
      <Avvvatars value={user.name} />
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
