import { useMutation, useStorage } from "@liveblocks/react/suspense";
import { useEffect, useMemo } from "react";
import { TRoom, TRoomPhase } from "@/types/types";
import { getUser } from "@/utils";

interface usePhaseInfoProps {
  pagePhase: TRoomPhase;
  room: TRoom;
}

const usePhaseInfo = (props: usePhaseInfoProps) => {
  const { pagePhase, room } = props;

  const user = useMemo(() => getUser(), []);
  const isOwnerOfRoom = useMemo(() => user.id === room?.ownerId, [user, room]);

  const phase = useStorage((root) => root.phase);

  const isCompleted = useMemo(() => {
    if (pagePhase === "REFLECT") {
      if (phase === "DISCUSS") {
        return true;
      }
      return false;
    }
    return false;
  }, [pagePhase, phase]);

  const changePhase = useMutation(
    ({ storage }) => {
      storage.set("phase", pagePhase);
    },
    [pagePhase]
  );

  return {
    isCompleted,
    changePhase,
    isOwnerOfRoom,
  };
};

export default usePhaseInfo;
