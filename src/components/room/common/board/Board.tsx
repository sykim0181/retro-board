import { createContext, useContext, useMemo } from "react";
import Column from "./Column";
import EditableBoardWrapper from "./EditableBoardWrapper";

type BoardContext = {
  editable: boolean;
  showLikes: boolean;
  votable: boolean;
};

const BoardContext = createContext<BoardContext | null>(null);

export const useBoardContext = () => {
  const boardContext = useContext(BoardContext);

  if (!boardContext) {
    throw new Error("Use useBoardContext within BoardContext.Provider");
  }

  return boardContext;
};

interface BoardProps {
  editable?: boolean;
  showLikes?: boolean;
  votable?: boolean;
}

const Board = (props: BoardProps) => {
  const { editable, votable, showLikes } = props;

  const columns = useMemo(
    () => (
      <>
        <Column type="start" />
        <Column type="end" />
        <Column type="continue" />
      </>
    ),
    []
  );

  return (
    <BoardContext.Provider
      value={{
        editable: editable ?? false,
        showLikes: showLikes ?? false,
        votable: votable ?? false,
      }}
    >
      <div className="flex-1 grid grid-cols-3 gap-[1rem] overflow-hidden">
        {editable ? (
          <EditableBoardWrapper>{columns}</EditableBoardWrapper>
        ) : (
          columns
        )}
      </div>
    </BoardContext.Provider>
  );
};

export default Board;
