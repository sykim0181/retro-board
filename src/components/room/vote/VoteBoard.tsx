import { useRoomContext } from "@/context/RoomContext";
import Board from "../common/board/Board";

const VoteBoard = () => {
  const { state } = useRoomContext();
  return <Board votable={state.phase === "VOTE"} showLikes />;
};

export default VoteBoard;
