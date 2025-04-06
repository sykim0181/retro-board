import { closestCorners, DndContext } from "@dnd-kit/core";
import useBoard from "@/hooks/useBoard";
import Column from "./Column";

const Board = () => {
  const { currentBoard, handleDragStart, handleDragOver, handleDragEnd } =
    useBoard();
  useBoard();

  return (
    <div className="h-full grid grid-cols-3 gap-[1rem]">
      <DndContext
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
      >
        <Column type="start" cards={currentBoard.start} />
        <Column type="end" cards={currentBoard.end} />
        <Column type="continue" cards={currentBoard.continue} />
      </DndContext>
    </div>
  );
};

export default Board;
