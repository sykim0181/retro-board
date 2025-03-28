import { useMemo, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { TCard, TColumnType } from "@/types/types";
import AddCard from "./AddCard";
import useColumn from "@/hooks/useColumn";
import ColumnCardContainer from "./ColumnCardContainer";

interface ColumnProps {
  type: TColumnType;
  cards: TCard[];
}

const Column = (props: ColumnProps) => {
  const { type, cards } = props;

  const [showAddCard, setShowAddCard] = useState(false);

  const { someoneIsTyping } = useColumn({ type });

  const SomeoneIsTyping = useMemo(() => {
    return someoneIsTyping ? <p>someone is typing...</p> : <p></p>;
  }, [someoneIsTyping]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex text-lg items-center px-[.5rem] py-[1rem]">
        <p className="block flex-1 text-start">{type}</p>
        <button
          className="cursor-pointer hover:text-gray-500"
          onClick={() => setShowAddCard(true)}
        >
          <FiPlus />
        </button>
      </div>

      {SomeoneIsTyping}

      {showAddCard && (
        <AddCard columnType={type} close={() => setShowAddCard(false)} />
      )}

      <ColumnCardContainer columnType={type} cards={cards} />
    </div>
  );
};

export default Column;
