import {
  shallow,
  useBroadcastEvent,
  useMutation,
  useStorage,
} from "@liveblocks/react/suspense";
import { TRoomPhase } from "@/types/types";
import { useCallback } from "react";

const usePhase = () => {
  const broadcast = useBroadcastEvent();

  const phase = useStorage((root) => root.phase);
  const hasCard = useStorage((root) => root.cards.size > 0, shallow);

  const changePhase = useMutation(
    ({ storage }, phase: TRoomPhase) => {
      storage.set("phase", phase);
      broadcast({ type: "PHASE_CHANGE", phase });
    },
    [broadcast]
  );

  const canChangePhase = useCallback(
    (targetPhase: TRoomPhase): boolean => {
      const currentPhase = phase;

      if (targetPhase === "REFLECT") {
        return true;
      }
      if (targetPhase === "VOTE") {
        return hasCard;
      }
      if (targetPhase === "DISCUSS") {
        if (currentPhase === "REFLECT") {
          return false;
        }
        return hasCard;
      }
      // targetPhase === "END"
      return true;
    },
    [phase, hasCard]
  );

  return {
    phase,
    changePhase,
    canChangePhase,
  };
};

export default usePhase;
