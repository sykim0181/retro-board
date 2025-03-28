import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { RiThumbUpLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { IoMdMore } from "react-icons/io";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { TCard } from "@/types/types";
import { deleteCard, useAppDispatch } from "@/lib/boardStore";

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

  const dispatch = useAppDispatch();

  const deleteCardItem = () => {
    dispatch(
      deleteCard({ card })
    );
  };

  const cursorStyle = isDragging ? "cursor-grabbing" : "cursor-grab";
  const styleByDrag = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      ref={setNodeRef}
      {...attributes}
      className={`w-full p-[.5rem] gap-[.5rem]`}
      style={styleByDrag}
    >
      <CardHeader className="flex">
        <div
          ref={setActivatorNodeRef}
          {...listeners}
          className={`${cursorStyle}`}
        >
          <IoMdMore />
        </div>
        <div className="flex-1" />
        <button className="hover:text-gray-500" onClick={deleteCardItem}>
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
