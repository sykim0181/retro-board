import { XIcon, CheckIcon } from "lucide-react";
import { useRef } from "react";
import { TColumnType } from "@/types/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import useAddCard from "@/hooks/useAddCard";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface AddCardProps {
  column: TColumnType;
  close: () => void;
}

const AddCard = (props: AddCardProps) => {
  const { column, close } = props;

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const { addCard } = useAddCard({ 
    column,
    titleRef,
    contentRef
  });

  return (
    <Card className="w-full p-[.5rem] gap-[.5rem]">
      <CardContent className="flex flex-col gap-[1rem]">
        <div>
          <Label htmlFor="title" className="sr-only">Title</Label>
          <Input id="title" ref={titleRef} placeholder="title" />
        </div>
        <div>
          <Label htmlFor="content" className="sr-only">Content</Label>
          <Textarea
            id="content"
            placeholder="content"
            ref={contentRef}
          />
        </div>

      </CardContent>

      <CardFooter className="justify-end gap-[.5rem]">
        <button
          onClick={close}
          className="text-(--border) hover:text-black cursor-pointer"
        >
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
