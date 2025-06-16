import { useStorage } from "@liveblocks/react/suspense";
import Board from "../common/board/Board";

const ReflectBoard = () => {
  const isReflectPhase = useStorage((root) => root.phase === "REFLECT");

  return <Board editable={isReflectPhase} />;
};

export default ReflectBoard;
