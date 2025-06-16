import { useStorage } from "@liveblocks/react/suspense";
import CardItem from "./CardItem";

interface FloatingBoardCardProps {
  cardId: string;
}

const FloatingBoardCard = (props: FloatingBoardCardProps) => {
  const { cardId } = props;

  const card = useStorage((root) => root.cards.get(cardId));

  if (!card) {
    return null;
  }

  const { title, content } = card;

  return (
    <CardItem className="opacity-60">
      <CardItem.Header>
        <CardItem.DragHandle />
        <CardItem.DeleteButton />
      </CardItem.Header>
      <CardItem.Content title={title} content={content} />
    </CardItem>
  );
};

export default FloatingBoardCard;
