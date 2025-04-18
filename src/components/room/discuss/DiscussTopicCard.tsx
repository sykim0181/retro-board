import EmojiPicker, { EmojiStyle, EmojiClickData } from "emoji-picker-react";
import { SmilePlusIcon } from "lucide-react";
import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import useDiscussTopicCard from "@/hooks/useDiscussTopicCard";
import EmojiReaction from "./EmojiReaction";
import { TCard } from "@/types/types";

interface DiscussTopicCardProps {
  topicIdx: number;
  card: TCard;
}

const DiscussTopicCard = (props: DiscussTopicCardProps) => {
  const { topicIdx, card } = props;

  const { reactions, handleEmojiClicked } = useDiscussTopicCard({
    topicIdx,
  });

  const [isOpen, setIsOpen] = useState(false);

  const onClickButton = () => {
    setIsOpen((prev) => !prev);
  };

  const onEmojiClicked = (emoji: EmojiClickData) => {
    handleEmojiClicked({
      unified: emoji.unified,
      name: emoji.names[0],
    });
    setIsOpen(false);
  };

  return (
    <Card className="p-[1rem] w-[300px] md:w-full lg:w-[300px] gap-[0.5rem] mx-auto md:mx-0">
      <CardContent className="break-words flex flex-col gap-[0.5rem]">
        <div className="text-white bg-gray-400 w-fit text-[0.8rem] px-[0.6rem] rounded-md">
          {card.category}
        </div>
        <span>{card.content}</span>
      </CardContent>

      <CardFooter className="flex gap-[1rem]">
        {reactions.length > 0 && (
          <div className="flex gap-[0.5rem]">
            {reactions.map((reaction) => (
              <EmojiReaction
                key={reaction.emoji.unified}
                reaction={reaction}
                handleEmojiClicked={handleEmojiClicked}
              />
            ))}
          </div>
        )}
        <div className="relative">
          <button
            onClick={onClickButton}
            className="flex justify-center items-center text-gray-400 hover:text-black cursor-pointer"
          >
            <SmilePlusIcon width="1rem" />
          </button>

          <div className="absolute">
            {isOpen && (
              <EmojiPicker
                emojiStyle={EmojiStyle.NATIVE}
                onEmojiClick={onEmojiClicked}
              />
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default React.memo(DiscussTopicCard);
