import { useRoomContext } from "@/context/RoomContext";
import Board from "../common/board/Board";

const ReflectBoard = () => {
  const { state } = useRoomContext();
  return <Board editable={state.phase === "REFLECT"} />;
};

export default ReflectBoard;
