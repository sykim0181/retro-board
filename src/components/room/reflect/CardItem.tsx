import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { ThumbsUpIcon, EllipsisVerticalIcon, XIcon } from "lucide-react";
import React from "react";
import { TColumnType } from "@/types/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import useCard from "@/hooks/useCard";
import CardItemLike from "./CardItemLike";

interface CardProps {
  cardId: string;
  column: TColumnType;
}

const CardItem = (props: CardProps) => {
  const { cardId, column } = props;

  const { content, deleteCard } = useCard({ cardId, column });

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
      column,
    },
  });

  const cursorStyle = isDragging ? "cursor-grabbing" : "cursor-grab";
  const styleByDrag = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (!content) {
    return null;
  }

  return (
    <Card
      ref={setNodeRef}
      {...attributes}
      className="w-full p-[.5rem] gap-[.5rem]"
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
        <button className="text-gray-500 hover:text-black" onClick={deleteCard}>
          <XIcon width="1rem" />
        </button>
      </CardHeader>

      <CardContent className="px-[.5rem] text-start break-words">
        {content}
      </CardContent>

      <CardFooter className="text-sm justify-end gap-[1rem]">
        <CardItemLike cardId={cardId} />
      </CardFooter>
    </Card>
  );
};

export default React.memo(CardItem);
