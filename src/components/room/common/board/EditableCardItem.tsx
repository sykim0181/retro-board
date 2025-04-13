import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMutation } from "@liveblocks/react";
import { EllipsisVerticalIcon, XIcon } from "lucide-react";
import { ComponentProps } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { TColumnType } from "@/types/types";

interface EditableCardItemProps extends ComponentProps<"div"> {
  cardId: string;
  cardColumn: TColumnType;
}

const EditableCardItem = (props: EditableCardItemProps) => {
  const { cardId, cardColumn, className, children } = props;

  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: cardId,
    data: {
      column: cardColumn,
    },
  });

  const deleteCard = useMutation(
    ({ storage }) => {
      const cards = storage.get("board").get(cardColumn);
      if (cards === undefined) {
        return;
      }

      const index = cards.findIndex((val) => val === cardId);
      cards.delete(index);
      storage.get("cards").delete(cardId);
    },
    [cardId, cardColumn]
  );

  const cursorStyle = isDragging ? "cursor-grabbing" : "cursor-grab";
  const styleByDrag = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      className={className}
      ref={setNodeRef}
      {...attributes}
      style={styleByDrag}
    >
      <CardHeader className="flex">
        <div
          ref={setActivatorNodeRef}
          {...listeners}
          className={`${cursorStyle} text-gray-500`}
        >
          <EllipsisVerticalIcon width="1rem" />
        </div>
        <div className="flex-1" />
        <button
          className="text-gray-500 hover:text-black cursor-pointer"
          onClick={deleteCard}
        >
          <XIcon width="1rem" />
        </button>
      </CardHeader>

      {children}
    </Card>
  );
};

export default EditableCardItem;
