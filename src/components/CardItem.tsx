import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { useMutation } from "@liveblocks/react/suspense";
import { ThumbsUpIcon, EllipsisVerticalIcon, XIcon } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { TBoard, TCard } from "@/types/types";

interface CardProps {
  card: TCard;
}

const CardItem = (props: CardProps) => {
  const { card } = props;

  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card.id,
    data: card,
  });

  const deleteCardItem = useMutation(({ storage }) => {
    const column = card.category;
    const board = storage.get("board") as TBoard;
    const newBoard: TBoard = {
      ...board,
      [column]: board[column].filter((val) => val.id !== card.id),
    };
    storage.set("board", newBoard);
  }, [card]);

  const cursorStyle = isDragging ? "cursor-grabbing" : "cursor-grab";
  const styleByDrag = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

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
        <button
          className="text-gray-500 hover:text-black"
          onClick={deleteCardItem}
        >
          <XIcon width="1rem" />
        </button>
      </CardHeader>

      <CardContent className="px-[.5rem] text-start">
        {card.content}
      </CardContent>

      <CardFooter className="text-sm justify-end gap-[1rem]">
        <div className="flex gap-[.5rem] items-center">
          <button className="text-gray-500 hover:text-black">
            <ThumbsUpIcon width="1rem" />
          </button>
          <p>{card.likes}</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CardItem;
