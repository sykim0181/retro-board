import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { TCard, TColumnType } from "@/types/types";
import {
  addCard,
  resetTypingState,
  setIsTypingTrue,
  useAppDispatch,
} from "@/lib/boardStore";

interface AddCardProps {
  columnType: TColumnType;
  close: () => void;
}

const AddCard = (props: AddCardProps) => {
  const { columnType, close } = props;

  const [draft, setDraft] = useState("");

  const dispatch = useAppDispatch();

  const addCardToColumn = () => {
    const newCard: TCard = {
      id: uuidv4(),
      category: columnType,
      content: draft,
      likes: 0,
    };
    dispatch(addCard({ card: newCard }));

    setDraft("");
  };

  useEffect(() => {
    if (draft !== "") {
      dispatch(setIsTypingTrue({ column: columnType }));
    } else {
      dispatch(resetTypingState());
    }
  }, [draft]);

  return (
    <Card className="w-full p-[.5rem] gap-[.5rem] mb-[1rem]">
      <CardContent>
        <Textarea
          id="content"
          placeholder="type something"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
      </CardContent>

      <CardFooter className="justify-end gap-[.5rem]">
        <button onClick={close} className="border hover:border-black">
          <IoClose />
        </button>
        <button onClick={addCardToColumn} className="border hover:border-black">
          <IoMdCheckmark />
        </button>
      </CardFooter>
    </Card>
  );
};

export default AddCard;
