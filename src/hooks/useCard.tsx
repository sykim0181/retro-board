import { useStorage } from "@liveblocks/react/suspense";

interface useCardProps {
  cardId: string;
}

const useCard = (props: useCardProps) => {
  const { cardId } = props;

  const title = useStorage((root) => root.cards.get(cardId)?.title);
  const content = useStorage((root) => root.cards.get(cardId)?.content);

  return {
    title,
    content,
  };
};

export default useCard;
