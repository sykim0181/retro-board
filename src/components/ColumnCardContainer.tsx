import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React, { useMemo } from "react";
import CardItem from "./CardItem";
import { TCard, TColumnType } from "@/types/types";

interface ColumnCardsProps {
  columnType: TColumnType;
  cards: TCard[];
}

const ColumnCardContainer = (props: ColumnCardsProps) => {
  const { columnType, cards } = props;

  const id = useMemo(() => `column-${columnType}`, [columnType]);

  const { setNodeRef } = useDroppable({ id });

  return (
    <SortableContext items={cards} strategy={verticalListSortingStrategy}>
      <div
        id={`column-${columnType}-droppable`}
        ref={setNodeRef}
        className="flex flex-col gap-[1rem] h-full"
      >
        {cards.map((card) => (
          <CardItem key={card.id} card={card} />
        ))}
      </div>
    </SortableContext>
  );
};

export default React.memo(ColumnCardContainer);
