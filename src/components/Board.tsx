import { DndContext } from "@dnd-kit/core";
import Column from "./Column";
import { useEffect } from "react";
import { useAppDispatch } from "@/lib/boardStore";
import { actions } from "@liveblocks/redux";

let roomId = "retro-board";

const Board = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(actions.enterRoom(roomId));

    return () => {
      dispatch(actions.leaveRoom());
    };
  }, [dispatch]);

  return (
    <DndContext>
      <div>
        <div className="grid grid-cols-3 gap-[1rem]">
          <Column type="START"></Column>
          <Column type="END"></Column>
          <Column type="CONTINUE"></Column>
        </div>
      </div>
    </DndContext>
  );
};

export default Board;
