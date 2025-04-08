import Avvvatars from "avvvatars-react";
import { ArrowUpIcon } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import useDiscuss from "@/hooks/useDiscuss";
import { getUser } from "@/utils";

interface DiscussContentProps {
  cardIdx: number;
} 

const DiscussContent = (props: DiscussContentProps) => {
  const { cardIdx } = props;

  const { card } = useDiscuss({ cardIdx });

  if (card === null) {
    throw new Error("Not Available Card");
  }

  const user = getUser();

  return (
    <div className="h-full flex flex-col gap-[2rem] md:bg-amber-50">
      <div className="flex justify-center gap-[2rem]">
        <span>{card.content}</span>
        <div className="py-[0.2rem] px-[1rem] rounded-2xl bg-gray-400 text-white">
          {card.category}
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-[1rem]">
        {/* 카드 */}
        <div className="md:flex-1">
          <Card className="p-[1rem] w-[300px] md:w-full lg:w-[300px] gap-[0.5rem] mx-auto md:mx-0">
            <CardContent className="break-words">
              {card.content}
            </CardContent>
            <CardFooter>
              {/* 이모지 */}
            </CardFooter>
          </Card>
        </div>

        {/* 채팅 */}
        <div className="flex-1 flex justify-center md:h-full">
          <Card className="w-full lg:w-[350px] gap-0">
            <CardHeader className="p-[1rem]">Discussion</CardHeader>
            <Separator />
            <CardContent className="flex-1 p-[1rem] flex flex-col">
              <div className="flex-1">

              </div>
              <div className="flex gap-[0.5rem]">
                <Avvvatars value={user.name} />
                <Input className="flex-1" />
                <button 
                  className="bg-gray-400 text-white rounded-[50%] w-[32px] h-[32px] flex justify-center items-center"
                >
                  <ArrowUpIcon />
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

}

export default DiscussContent;
