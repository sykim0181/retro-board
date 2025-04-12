import useCardItemLike from "@/hooks/useCardItemLike";
import { cn } from "@/lib/utils";
import { ThumbsUpIcon } from "lucide-react";

interface CardItemLikeProps {
  cardId: string;
}

const CardItemLike = (props: CardItemLikeProps) => {
  const { cardId } = props;

  const { likes, hasLiked, onClickLikeButton } = useCardItemLike({ cardId });

  return (
    <div className="flex gap-[.5rem] items-center">
      <button
        className={cn([
          hasLiked ? "text-black" : "text-gray-500",
          "hover:text-black",
          "cursor-pointer",
        ])}
        onClick={onClickLikeButton}
      >
        <ThumbsUpIcon width="1rem" fill={hasLiked ? "black" : "none"} />
      </button>
      <p>{likes.length}</p>
    </div>
  );
};

export default CardItemLike;
