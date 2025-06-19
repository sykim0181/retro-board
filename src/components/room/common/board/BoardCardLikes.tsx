import useCard from "@/hooks/useCard";
import { useAppSelector } from "@/store/store";
import { TColumnType } from "@/types/types";
import { useBoardContext } from "./Board";
import { useMemo } from "react";
import CardItem from "./CardItem";

interface BoardCardLikesProps {
  cardId: string;
  cardColumn: TColumnType;
}

const BoardCardLikes = (props: BoardCardLikesProps) => {
  const { cardId, cardColumn } = props;

  const { likes, likeCard, cancelLikeCard } = useCard({ cardId, cardColumn });
  const user = useAppSelector((state) => state.user.user);
  const { votable } = useBoardContext();

  if (!likes) {
    return null;
  }

  const hasLiked = useMemo(() => {
    return likes.some((like) => like.user.id === user.id);
  }, [likes, user]);

  const onClickLikeButton = () => {
    if (hasLiked) {
      cancelLikeCard(user);
    } else {
      likeCard(user);
    }
  };

  return (
    <CardItem.Likes
      likes={likes.length}
      hasLiked={hasLiked}
      onClickLikeButton={votable ? onClickLikeButton : undefined}
    />
  );
};

export default BoardCardLikes;
