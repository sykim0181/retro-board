import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ComponentProps } from "react";
import { useDroppable } from "@dnd-kit/core";
import { TColumnType } from "@/types/types";

interface EditableCardListWrapperProps extends ComponentProps<"div"> {
  columnType: TColumnType;
  cardIdList: string[];
}

const EditableCardListWrapper = (props: EditableCardListWrapperProps) => {
  const { columnType, cardIdList, className, children } = props;

  const { setNodeRef } = useDroppable({ id: `column-${columnType}` });

  return (
    <SortableContext items={cardIdList} strategy={verticalListSortingStrategy}>
      <div
        id={`column-${columnType}-droppable`}
        ref={setNodeRef}
        className={className}
      >
        {children}
      </div>
    </SortableContext>
  );
};

export default EditableCardListWrapper;
