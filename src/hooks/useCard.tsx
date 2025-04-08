import { TColumnType } from "@/types/types";
import { useMutation, useStorage } from "@liveblocks/react/suspense";

interface useCardProps {
  cardId: string;
  column: TColumnType;
}

const useCard = (props: useCardProps) => {
  const { cardId, column } = props;

  const task = useStorage((root) => root.tasks.get(cardId));

  const deleteCard = useMutation(({ storage }) => {
    const cards = storage.get("board").get(column);
    if (cards === undefined) {
      return;
    }

    const index = cards.findIndex(val => val === cardId);
    cards.delete(index);
  }, [cardId, column]);

  return {
    task,
    deleteCard
  };
};

export default useCard;
