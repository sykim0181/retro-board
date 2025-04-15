import { ThumbsUpIcon } from "lucide-react";
import useDiscuss from "@/hooks/useDiscuss";
import ChatBox from "./ChatBox";
import DiscussTaskCard from "./DiscussTaskCard";
import { TCard } from "@/types/types";

const DiscussContent = () => {
  const { taskIdx, card } = useDiscuss();

  return (
    <div className="h-full flex flex-col gap-[2rem]">
      <div className="flex justify-center gap-[2rem]">
        <span>{card.title}</span>
        <div className="flex gap-[0.5rem] py-[0.1rem] px-[1rem] rounded-xl bg-gray-400 text-white">
          <ThumbsUpIcon width="0.9rem" />
          <span className="text-[0.9rem]">{card.likes.length}</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-[1rem] overflow-y-hidden">
        {/* 카드 */}
        <div className="flex-initial md:flex-1">
          <DiscussTaskCard taskIdx={taskIdx} card={card as TCard} />
        </div>

        {/* 채팅 */}
        <div className="flex-1 flex justify-center md:h-full overflow-y-hidden">
          <ChatBox taskIdx={taskIdx} />
        </div>
      </div>
    </div>
  );
};

export default DiscussContent;
