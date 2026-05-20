import { TRoomPhase } from "@/types/types";
import { useCallback } from "react";
import { useRoomContext } from "@/context/RoomContext";

const usePhase = () => {
  const { state, send } = useRoomContext();
  const phase = state.phase;
  const hasCard = Object.keys(state.cards).length > 0;

  const changePhase = useCallback(
    (targetPhase: TRoomPhase) => {
      send({ type: "CHANGE_PHASE", phase: targetPhase });
    },
    [send]
  );

  const canChangePhase = useCallback(
    (targetPhase: TRoomPhase): boolean => {
      if (targetPhase === "REFLECT") return true;
      if (targetPhase === "VOTE") return hasCard;
      if (targetPhase === "DISCUSS") {
        if (phase === "REFLECT") return false;
        return hasCard;
      }
      return true;
    },
    [phase, hasCard]
  );

  return { phase, changePhase, canChangePhase };
};

export default usePhase;
