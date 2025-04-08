import { closestCorners, DndContext } from "@dnd-kit/core";
import useBoard from "@/hooks/useBoard";
import Column from "./Column";

const Board = () => {
  const { handleDragOver, handleDragEnd } = useBoard();

  return (
    <div className="h-full grid grid-cols-3 gap-[1rem]">
      <DndContext
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
      >
          <Column type="start" />
          <Column type="end" />
          <Column type="continue" />
      </DndContext>
    </div>
  );
};

export default Board;
