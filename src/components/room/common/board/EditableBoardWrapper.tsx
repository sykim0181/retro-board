import { closestCorners, DndContext, DragOverlay } from "@dnd-kit/core";
import useEditableBoard from "@/hooks/useEditableBoard";
import FloatingBoardCard from "./FloatingBoardCard";
import { createContext, useContext } from "react";

type TEditableBoardContext = {
  activeCardId: string | null;
};

const EditableBoardContext = createContext<TEditableBoardContext | null>(null);

export const useEditableBoardContext = () => {
  const editableBoardContext = useContext(EditableBoardContext);

  if (!editableBoardContext) {
    throw new Error("Use within EditableBoardContext.Provider");
  }

  return editableBoardContext;
};

const EditableBoardWrapper = ({ children }: { children: React.ReactNode }) => {
  const { activeCardId, handleDragStart, handleDragOver, handleDragEnd } =
    useEditableBoard();

  return (
    <EditableBoardContext.Provider value={{ activeCardId }}>
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
    </EditableBoardContext.Provider>
  );
};

export default EditableBoardWrapper;
