import { useMutation } from "@liveblocks/react";
import { LiveObject } from "@liveblocks/client";
import { nanoid } from "nanoid";
import { useState } from "react";
import { TColumnType, TLike } from "@/types/types";
import { Card } from "@/types/liveblocks";

interface useAddCardProps {
  column: TColumnType;
}

const useAddCard = (props: useAddCardProps) => {
  const { column } = props;

  const [draft, setDraft] = useState("");

  const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDraft(e.target.value);
  };

  const addCard = useMutation(
    ({ storage }) => {
      const newId = nanoid();
      const newCard: Card = new LiveObject({
        id: newId,
        category: column,
        content: draft,
        likes: new Array<TLike>(),
      });

      const container = storage.get("board").get(column);
      container?.push(newId);

      const cards = storage.get("cards");
      cards.set(newId, newCard);

      setDraft("");
    },
    [draft, column]
  );

  return {
    draft,
    onChangeTextArea,
    addCard,
  };
};

export default useAddCard;
