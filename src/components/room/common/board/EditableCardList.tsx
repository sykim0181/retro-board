import { TColumnType } from "@/types/types";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ComponentProps } from "react";
import EditableCard from "./EditableCard";
import { useEditableBoardContext } from "./EditableBoardWrapper";

interface EditableCardListProps extends ComponentProps<"div"> {
  columnType: TColumnType;
  cardIdList: string[];
}

const EditableCardList = (props: EditableCardListProps) => {
  const { columnType, cardIdList, className } = props;

  const { activeCardId } = useEditableBoardContext();

  const { setNodeRef } = useDroppable({ id: `column-${columnType}` });

  return (
    <SortableContext items={cardIdList} strategy={verticalListSortingStrategy}>
      <div
        id={`column-${columnType}-droppable`}
        ref={setNodeRef}
        className={className}
      >
        {cardIdList.map((cardId) => (
          <EditableCard
            key={cardId}
            cardId={cardId}
            cardColumn={columnType}
            isActive={cardId === activeCardId}
          />
        ))}
      </div>
    </SortableContext>
  );
};

export default EditableCardList;
