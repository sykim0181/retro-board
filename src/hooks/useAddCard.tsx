import { nanoid } from "nanoid";
import { RefObject } from "react";
import { TCard, TColumnType } from "@/types/types";
import { useRoomContext } from "@/context/RoomContext";

interface useAddCardProps {
  column: TColumnType;
  titleRef: RefObject<HTMLInputElement | null>;
  contentRef: RefObject<HTMLTextAreaElement | null>;
}

const useAddCard = (props: useAddCardProps) => {
  const { column, titleRef, contentRef } = props;
  const { send } = useRoomContext();

  const addCard = () => {
    if (!titleRef.current || !contentRef.current) return;

    const title = titleRef.current.value;
    const content = contentRef.current.value;
    if (title === "" || content === "") return;

    const newCard: TCard = {
      id: nanoid(),
      category: column,
      title,
      content,
      likes: [],
    };

    send({ type: "ADD_CARD", card: newCard, column });

    titleRef.current.value = "";
    contentRef.current.value = "";
  };

  return { addCard };
};

export default useAddCard;
