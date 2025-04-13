import { closestCorners, DndContext } from "@dnd-kit/core";
import useEditableBoard from "@/hooks/useEditableBoard";

const EditableBoardWrapper = ({ children }: { children: React.ReactNode }) => {
  const { handleDragOver, handleDragEnd } = useEditableBoard();

  return (
    <DndContext
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCorners}
    >
      {children}
    </DndContext>
  );
};

export default EditableBoardWrapper;
