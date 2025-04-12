import { XIcon, CheckIcon } from "lucide-react";
import { TColumnType } from "@/types/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import useAddCard from "@/hooks/useAddCard";

interface AddCardProps {
  column: TColumnType;
  close: () => void;
}

const AddCard = (props: AddCardProps) => {
  const { column, close } = props;

  const {
    draft,
    onChangeTextArea,
    addCard 
  } = useAddCard({ column })

  return (
    <Card className="w-full p-[.5rem] gap-[.5rem]">
      <CardContent>
        <Textarea
          id="content"
          placeholder="type something"
          value={draft}
          onChange={onChangeTextArea}
        />
      </CardContent>

      <CardFooter className="justify-end gap-[.5rem]">
        <button 
          onClick={close} 
          className="text-(--border) hover:text-black cursor-pointer">
          <XIcon width="1rem" />
        </button>
        <button
          onClick={addCard}
          className="text-(--border) hover:text-black cursor-pointer"
        >
          <CheckIcon width="1rem" />
        </button>
      </CardFooter>
    </Card>
  );
};

export default AddCard;
