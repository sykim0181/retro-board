import { TColumnType } from "@/types/types";
import { useRoomContext } from "@/context/RoomContext";
import { useAppSelector } from "@/store/store";

interface useCardProps {
  cardId: string;
  cardColumn?: TColumnType;
}

const useCard = (props: useCardProps) => {
  const { cardId, cardColumn } = props;
  const { state, send } = useRoomContext();
  const user = useAppSelector((s) => s.user.user);

  const card = state.cards[cardId];
  const title = card?.title;
  const content = card?.content;
  const likes = card?.likes;

  const deleteCard = () => {
    const column = cardColumn ?? card?.category;
    if (!column) return;
    send({ type: "DELETE_CARD", cardId, column });
  };

  const likeCard = () => {
    send({ type: "LIKE_CARD", cardId, user });
  };

  const cancelLikeCard = () => {
    send({ type: "CANCEL_LIKE_CARD", cardId, userId: user.id });
  };

  return { title, content, likes, deleteCard, likeCard, cancelLikeCard };
};

export default useCard;
