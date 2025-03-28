import { closestCorners, DndContext } from "@dnd-kit/core";
import { useEffect } from "react";
import { actions } from "@liveblocks/redux";
import Column from "./Column";
import { useAppDispatch } from "@/lib/boardStore";
import useBoard from "@/hooks/useBoard";

let roomId = "retro-board";

const Board = () => {
  const { currentBoard, handleDragStart, handleDragOver, handleDragEnd } =
    useBoard();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(actions.enterRoom(roomId));

    return () => {
      dispatch(actions.leaveRoom());
    };
  }, [dispatch]);

  return (
    <div className="flex flex-col flex-1">
      <div className="flex-1 grid grid-cols-3 gap-[1rem]">
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
    </div>
  );
};

export default Board;
