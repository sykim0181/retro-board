import { closestCorners, DndContext, DragOverlay } from "@dnd-kit/core";
import useEditableBoard from "@/hooks/useEditableBoard";
import FloatingBoardCard from "./FloatingBoardCard";

const EditableBoardWrapper = ({ children }: { children: React.ReactNode }) => {
  const { activeCardId, handleDragStart, handleDragOver, handleDragEnd } =
    useEditableBoard();

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCorners}
    >
      {children}

      <DragOverlay>
        {activeCardId && <FloatingBoardCard cardId={activeCardId} />}
      </DragOverlay>
    </DndContext>
  );
};

export default EditableBoardWrapper;
