import { Card, CardContent, CardFooter } from "@/components/ui/card";
import useDiscuss from "@/hooks/useDiscuss";
import ChatBox from "./ChatBox";
import { ThumbsUpIcon } from "lucide-react";

interface DiscussContentProps {
  cardIdx: number;
} 

const DiscussContent = (props: DiscussContentProps) => {
  const { cardIdx } = props;

  const { card } = useDiscuss({ cardIdx });

  if (card === null) {
    throw new Error("Not Available Card");
  }

  return (
    <div className="h-full flex flex-col gap-[2rem]">
      <div className="flex justify-center gap-[2rem]">
        <span>{card.content}</span>
        <div className="flex gap-[0.5rem] py-[0.2rem] px-[1rem] rounded-2xl bg-gray-400 text-white">
          <ThumbsUpIcon width="1rem" />
          <span>{card.likes.length}</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-[1rem] overflow-y-hidden">
        {/* 카드 */}
        <div className="flex-initial md:flex-1">
          <Card className="p-[1rem] w-[300px] md:w-full lg:w-[300px] gap-[0.5rem] mx-auto md:mx-0">
            <CardContent className="break-words flex flex-col gap-[0.5rem]">
              <div className="text-white bg-gray-400 w-fit text-[0.8rem] px-[0.6rem] rounded-md">{card.category}</div>
              <span>{card.content}</span>
            </CardContent>
            <CardFooter>
              {/* 이모지 */}
            </CardFooter>
          </Card>
        </div>

        {/* 채팅 */}
        <div className="flex-1 flex justify-center md:h-full overflow-y-hidden">
          <ChatBox taskId={card.id} />
        </div>
      </div>
    </div>
  )

}

export default DiscussContent;
