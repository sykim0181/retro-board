import { ThumbsUpIcon } from "lucide-react";
import useCardItemLike from "@/hooks/useCardItemLike";
import { cn } from "@/lib/utils";
import { useBoardContext } from "./Board";

interface CardItemLikeProps {
  cardId: string;
}

const CardItemLike = (props: CardItemLikeProps) => {
  const { cardId } = props;

  const { likes, hasLiked, onClickLikeButton } = useCardItemLike({ cardId });
  const { votable } = useBoardContext();

  return (
    <div className="flex gap-[.5rem] items-center">
      <button
        className={cn([
          hasLiked ? "text-black" : "text-gray-500",
          "hover:text-black",
          votable ? "cursor-pointer" : "cursor-default",
        ])}
        disabled={!votable}
        onClick={onClickLikeButton}
      >
        <ThumbsUpIcon width="1rem" fill={hasLiked ? "black" : "none"} />
      </button>
      <p>{likes.length}</p>
    </div>
  );
};

export default CardItemLike;
