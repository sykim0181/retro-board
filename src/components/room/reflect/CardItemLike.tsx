import useCardItemLike from "@/hooks/useCardItemLike";
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
        className={`${hasLiked ? "text-black" : "text-gray-500"} hover:text-black`}
        onClick={onClickLikeButton}
      >
        <ThumbsUpIcon width="1rem" fill={hasLiked ? "black" : "none"} />
      </button>
      <p>{likes.length}</p>
    </div>
  );
};

export default CardItemLike;
