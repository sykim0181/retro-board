import { TColumnType, TLike, TUser } from "@/types/types";
import { useMutation, useStorage } from "@liveblocks/react/suspense";

interface useCardProps {
  cardId: string;
  cardColumn?: TColumnType;
}

const useCard = (props: useCardProps) => {
  const { cardId, cardColumn } = props;

  const title = useStorage((root) => root.cards.get(cardId)?.title);
  const content = useStorage((root) => root.cards.get(cardId)?.content);
  const likes = useStorage((root) => root.cards.get(cardId)?.likes);

  const deleteCard = useMutation(
    ({ storage }) => {
      let column =
        cardColumn ?? storage.get("cards").get(cardId)?.get("category");
      if (!column) {
        return;
      }

      const cards = storage.get("board").get(column);
      if (cards === undefined) {
        return;
      }

      const index = cards.findIndex((val) => val === cardId);
      cards.delete(index);
      storage.get("cards").delete(cardId);
    },
    [cardId, cardColumn]
  );

  const likeCard = useMutation(
    ({ storage }, user: TUser) => {
      const card = storage.get("cards").get(cardId);

      if (!card) {
        return;
      }

      const newLike: TLike = {
        user,
      };
      card.set("likes", [...card.get("likes"), newLike]);
    },
    [cardId]
  );

  const cancelLikeCard = useMutation(
    ({ storage }, user: TUser) => {
      const card = storage.get("cards").get(cardId);

      if (!card) {
        return;
      }

      card.set(
        "likes",
        card.get("likes").filter((like) => like.user.id !== user.id)
      );
    },
    [cardId]
  );

  return {
    title,
    content,
    likes,
    deleteCard,
    likeCard,
    cancelLikeCard,
  };
};

export default useCard;
