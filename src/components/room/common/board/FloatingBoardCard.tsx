import { useRoomContext } from "@/context/RoomContext";
import CardItem from "./CardItem";

interface FloatingBoardCardProps {
  cardId: string;
}

const FloatingBoardCard = (props: FloatingBoardCardProps) => {
  const { cardId } = props;
  const { state } = useRoomContext();
  const card = state.cards[cardId];

  if (!card) return null;

  return (
    <CardItem className="opacity-60">
      <CardItem.Header>
        <CardItem.DragHandle />
        <CardItem.DeleteButton />
      </CardItem.Header>
      <CardItem.Content title={card.title} content={card.content} />
    </CardItem>
  );
};

export default FloatingBoardCard;
