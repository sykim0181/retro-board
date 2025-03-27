import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { RiThumbUpLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { IoMdMore } from "react-icons/io";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { TCard, TColumnType } from "@/types/types";
import { deleteCard, useAppDispatch } from "@/lib/boardStore";

interface CardProps {
  card: TCard;
  type: TColumnType;
}

const CardItem = (props: CardProps) => {
  const { card, type } = props;

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: card.id,
  });

  const dispatch = useAppDispatch();

  const deleteCardItem = (e: React.MouseEvent) => {
    e.stopPropagation();

    console.log("click");
    dispatch(
      deleteCard({
        type,
        cardId: card.id,
      })
    );
  };

  const cursorStyle = isDragging ? "cursor-grabbing" : "cursor-grab";

  return (
    <Card
      ref={setNodeRef}
      {...attributes}
      className={`w-full p-[.5rem] gap-[.5rem]`}
      style={{
        transform: CSS.Translate.toString(transform),
      }}
    >
      <CardHeader className="flex">
        <div {...listeners} className={`${cursorStyle}`}>
          <IoMdMore />
        </div>
        <div className="flex-1" />
        <button
          className="hover:text-gray-500"
          onClick={deleteCardItem}
          onMouseDown={(e) => e.stopPropagation()}
          onMouseDownCapture={(e) => e.stopPropagation()}
        >
          <IoClose />
        </button>
      </CardHeader>

      <CardContent className="px-[.5rem] text-start">
        {card.content}
      </CardContent>

      <CardFooter className="text-sm justify-end gap-[1rem]">
        <div className="flex gap-[.5rem] items-center">
          <button className="hover:text-gray-500">
            <RiThumbUpLine />
          </button>
          <p>{card.likes}</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CardItem;
