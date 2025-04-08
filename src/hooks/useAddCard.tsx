import { useMutation } from "@liveblocks/react";
import { LiveList, LiveObject } from "@liveblocks/client";
import { nanoid } from "nanoid";
import { useState } from "react";
import { TColumnType } from "@/types/types";
import { Card, Chat, Task } from "@/types/liveblocks";

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
        likes: 0,
      });

      const container = storage.get("board").get(column);
      container?.push(newId);

      const tasks = storage.get("tasks");
      const newTask: Task = new LiveObject({
        card: newCard,
        chats: new LiveList<Chat>([]),
      });
      tasks.set(newId, newTask);

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
