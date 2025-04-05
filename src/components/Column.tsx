import { useRef, useState } from "react";
import { PlusIcon } from "lucide-react";
import { TCard, TColumnType } from "@/types/types";
import AddCard from "./AddCard";
import ColumnCardContainer from "./ColumnCardContainer";
import { Card } from "./ui/card";

interface ColumnProps {
  type: TColumnType;
  cards: TCard[];
}

const Column = (props: ColumnProps) => {
  const { type, cards } = props;

  const [showAddCard, setShowAddCard] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const onClickAddButton = () => {
    if (showAddCard) {
      return;
    }

    ref.current?.scrollTo({ top: 0, behavior: "smooth" });
    setShowAddCard(true);
  };

  return (
    <Card
      className="relative h-full box-border flex flex-col gap-0 overflow-y-scroll hide-scrollbar"
      ref={ref}
    >
      <div className="sticky top-0 left-0 flex items-center p-[1rem] bg-white">
        <p className="block flex-1 text-start font-bold">{type}</p>
        <button
          className="cursor-pointer hover:text-gray-500"
          onClick={onClickAddButton}
        >
          <PlusIcon width="1rem" />
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-[1rem] p-[1rem]">
        {showAddCard && (
          <AddCard columnType={type} close={() => setShowAddCard(false)} />
        )}

        <ColumnCardContainer columnType={type} cards={cards} />
      </div>
    </Card>
  );
};

export default Column;
