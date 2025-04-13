import { useStorage } from "@liveblocks/react/suspense";
import Board from "../common/board/Board";

const VoteBoard = () => {
  const isVotePhase = useStorage((root) => root.phase === "VOTE");

  return <Board votable={isVotePhase} showLikes />;
};

export default VoteBoard;
