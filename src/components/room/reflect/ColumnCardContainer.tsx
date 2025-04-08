import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React, { useMemo } from "react";
import CardItem from "./CardItem";
import { TColumnType } from "@/types/types";

interface ColumnCardsProps {
  columnType: TColumnType;
  cardIdList: string[];
}

const ColumnCardContainer = (props: ColumnCardsProps) => {
  const { columnType, cardIdList } = props;

  const id = useMemo(() => `column-${columnType}`, [columnType]);

  const { setNodeRef } = useDroppable({ id });

  return (
    <SortableContext items={cardIdList} strategy={verticalListSortingStrategy}>
      <div
        id={`column-${columnType}-droppable`}
        ref={setNodeRef}
        className="flex flex-col gap-[1rem] h-full"
      >
        {cardIdList.map((cardId) => (
          <CardItem key={cardId} cardId={cardId} column={columnType} />
        ))}
      </div>
    </SortableContext>
  );
};

export default React.memo(ColumnCardContainer);
