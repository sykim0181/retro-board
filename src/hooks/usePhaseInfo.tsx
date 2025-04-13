import { useMemo } from "react";
import { TRoom, TRoomPhase } from "@/types/types";
import usePhase from "./usePhase";
import { useAppSelector } from "@/store/store";

interface usePhaseInfoProps {
  pagePhase: TRoomPhase;
  room: TRoom;
}

const usePhaseInfo = (props: usePhaseInfoProps) => {
  const { pagePhase, room } = props;

  const user = useAppSelector((state) => state.user.user);
  const isOwnerOfRoom = useMemo(() => user.id === room?.ownerId, [user, room]);

  const { phase, changePhase } = usePhase();

  const isCompleted = useMemo(() => {
    switch (pagePhase) {
      case "REFLECT": {
        if (phase === "VOTE" || phase === "DISCUSS") {
          return true;
        }
        return false;
      }
      case "VOTE": {
        if (phase === "DISCUSS") {
          return true;
        }
        return false;
      }
      default: {
        return false;
      }
    }
  }, [pagePhase, phase]);

  return {
    isCompleted,
    changePhase,
    isOwnerOfRoom,
  };
};

export default usePhaseInfo;
