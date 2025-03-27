import { useMemo, useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { FiPlus } from "react-icons/fi";
import CardItem from "./CardItem";
import { TColumnType } from "@/types/types";
import AddCard from "./AddCard";
import useColumn from "@/hooks/useColumn";

interface ColumnProps {
  type: TColumnType;
}

const Column = (props: ColumnProps) => {
  const { type } = props;

  const { setNodeRef } = useDroppable({
    id: `column-${type}`,
  });

  const [showAddCard, setShowAddCard] = useState(false);

  const { cards, someoneIsTyping } = useColumn({ type });

  const CardItems = useMemo(() => {
    return cards.map((card) => (
      <CardItem key={card.id} card={card} type={type} />
    ));
  }, [cards]);

  const SomeoneIsTyping = useMemo(() => {
    return someoneIsTyping ? <p>someone is typing</p> : <p></p>;
  }, [someoneIsTyping]);

  return (
    <div className="h-full">
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

      <div>
        {showAddCard && (
          <AddCard columnType={type} close={() => setShowAddCard(false)} />
        )}

        <div ref={setNodeRef} className="flex flex-col gap-[1rem]">
          {CardItems}
        </div>
      </div>
    </div>
  );
};

export default Column;
