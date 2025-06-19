import useCard from "@/hooks/useCard";
import { TColumnType } from "@/types/types";
import { useBoardContext } from "./Board";
import { useSortable } from "@dnd-kit/sortable";
import CardItem from "./CardItem";
import BoardCardLikes from "./BoardCardLikes";

interface EditableCardProps {
  cardId: string;
  cardColumn: TColumnType;
  isActive?: boolean;
}

const EditableCard = (props: EditableCardProps) => {
  const { cardId, cardColumn, isActive } = props;

  const { title, content, deleteCard } = useCard({
    cardId,
    cardColumn,
  });

  const { showLikes } = useBoardContext();

  const { attributes, listeners, setNodeRef, setActivatorNodeRef } =
    useSortable({
      id: cardId,
      data: {
        column: cardColumn,
      },
    });

  return (
    <CardItem
      ref={setNodeRef}
      {...attributes}
      className={isActive ? "opacity-0" : "opacity-100"}
    >
      <CardItem.Header>
        <CardItem.DragHandle ref={setActivatorNodeRef} {...listeners} />
        <CardItem.DeleteButton onClick={deleteCard} />
      </CardItem.Header>
      <CardItem.Content title={title ?? ""} content={content ?? ""} />
      {showLikes && (
        <CardItem.Footer>
          <BoardCardLikes cardId={cardId} cardColumn={cardColumn} />
        </CardItem.Footer>
      )}
    </CardItem>
  );
};

export default EditableCard;
