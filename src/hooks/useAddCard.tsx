import { useMutation } from "@liveblocks/react";
import { LiveObject } from "@liveblocks/client";
import { nanoid } from "nanoid";
import { RefObject } from "react";
import { TColumnType, TLike } from "@/types/types";
import { Card } from "@/types/liveblocks";

interface useAddCardProps {
  column: TColumnType;
  titleRef: RefObject<HTMLInputElement | null>;
  contentRef: RefObject<HTMLTextAreaElement | null>;
}

const useAddCard = (props: useAddCardProps) => {
  const { column, titleRef, contentRef } = props;

  const addCard = useMutation(
    ({ storage }) => {
      if (!titleRef.current || !contentRef.current) {
        return;
      }

      const title = titleRef.current.value;
      const content = contentRef.current.value;
      if (title === "" || content === "") {
        return;
      }

      const newId = nanoid();
      const newCard: Card = new LiveObject({
        id: newId,
        category: column,
        title,
        content,
        likes: new Array<TLike>(),
      });

      const container = storage.get("board").get(column);
      container?.push(newId);

      const cards = storage.get("cards");
      cards.set(newId, newCard);

      titleRef.current.value = "";
      contentRef.current.value = "";
    },
    [column, titleRef, contentRef]
  );

  return {
    addCard,
  };
};

export default useAddCard;
