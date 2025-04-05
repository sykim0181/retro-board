import { useState } from "react";
import { XIcon, CheckIcon } from "lucide-react";
import { useMutation } from "@liveblocks/react/suspense";
import { nanoid } from "nanoid";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { TBoard, TCard, TColumnType } from "@/types/types";

interface AddCardProps {
  columnType: TColumnType;
  close: () => void;
}

const AddCard = (props: AddCardProps) => {
  const { columnType, close } = props;

  const [draft, setDraft] = useState("");

  const addCard = useMutation(({ storage }) => {
    const prev = storage.get("board") as TBoard;
    const newCard: TCard = {
      id: nanoid(),
      category: columnType,
      content: draft,
      likes: 0
    }
    const newBoard: TBoard = {
      ...prev,
      [columnType]: [...prev[columnType], newCard]
    }

    storage.set("board", newBoard);
  }, [draft]);

  const addCardToColumn = () => {
    if (draft === "") {
      return;
    }
    addCard();
    setDraft("");
  };

  return (
    <Card className="w-full p-[.5rem] gap-[.5rem]">
      <CardContent>
        <Textarea
          id="content"
          placeholder="type something"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
      </CardContent>

      <CardFooter className="justify-end gap-[.5rem]">
        <button onClick={close} className="text-(--border) hover:text-black">
          <XIcon width="1rem" />
        </button>
        <button
          onClick={addCardToColumn}
          className="text-(--border) hover:text-black"
        >
          <CheckIcon width="1rem" />
        </button>
      </CardFooter>
    </Card>
  );
};

export default AddCard;
