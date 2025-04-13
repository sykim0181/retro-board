import { useBroadcastEvent, useMutation, useStorage } from "@liveblocks/react/suspense";
import { TRoomPhase } from "@/types/types";

const usePhase = () => {
  const broadcast = useBroadcastEvent();

  const phase = useStorage((root) => root.phase);

  const changePhase = useMutation(
    ({ storage }, phase: TRoomPhase) => {
      storage.set("phase", phase);
      broadcast({ type: "PHASE_CHANGE", phase });
    },
    [broadcast]
  );

  return {
    phase,
    changePhase,
  };
};

export default usePhase;
