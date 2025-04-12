import { useMutation, useStorage } from "@liveblocks/react/suspense";
import { TColumnType } from "@/types/types";

interface useCardProps {
  cardId: string;
  column: TColumnType;
}

const useCard = (props: useCardProps) => {
  const { cardId, column } = props;

  const content = useStorage((root) => root.cards.get(cardId)?.content);

  const deleteCard = useMutation(
    ({ storage }) => {
      const cards = storage.get("board").get(column);
      if (cards === undefined) {
        return;
      }

      const index = cards.findIndex((val) => val === cardId);
      cards.delete(index);
    },
    [cardId, column]
  );

  return {
    content,
    deleteCard,
  };
};

export default useCard;
