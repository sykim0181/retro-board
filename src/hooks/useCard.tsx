import { useStorage } from "@liveblocks/react/suspense";

interface useCardProps {
  cardId: string;
}

const useCard = (props: useCardProps) => {
  const { cardId } = props;

  const content = useStorage((root) => root.cards.get(cardId)?.content);

  return {
    content,
  };
};

export default useCard;
