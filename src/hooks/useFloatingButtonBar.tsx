import { useAppSelector } from "@/store/store";
import { TRoom } from "@/types/types";
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router";
import usePhase from "./usePhase";

interface useFloatingButtonBarProps {
  room: TRoom;
}

const useFloatingButtonBar = (props: useFloatingButtonBarProps) => {
  const { room } = props;

  const { phase, changePhase, canChangePhase } = usePhase();

  const user = useAppSelector((state) => state.user.user);
  const isOwnerOfRoom = useMemo(() => user.id === room.ownerId, [room, user]);

  const navigate = useNavigate();

  /* 버튼 표시 여부 */
  const showToNextPhaseButton = useMemo(() => {
    if (!isOwnerOfRoom) {
      return false;
    }
    return phase !== "DISCUSS";
  }, [isOwnerOfRoom, phase]);
  const showEndMeetingButton = useMemo(() => isOwnerOfRoom, [isOwnerOfRoom]);

  const canChangeToNextPhase = useMemo((): boolean => {
    switch (phase) {
      case "REFLECT": {
        return canChangePhase("VOTE");
      }
      case "VOTE": {
        return canChangePhase("DISCUSS");
      }
      case "DISCUSS": {
        return canChangePhase("END");
      }
      default: {
        return false;
      }
    }
  }, [phase, canChangePhase]);

  const toNextPhase = useCallback(() => {
    switch (phase) {
      case "REFLECT": {
        changePhase("VOTE");
        navigate(`/room/${room.id}/vote`);
        break;
      }
      case "VOTE": {
        changePhase("DISCUSS");
        navigate(`/room/${room.id}/discuss/1`);
        break;
      }
      default: {
        break;
      }
    }
  }, [phase, navigate, changePhase]);

  const endMeeting = useCallback(() => {
    changePhase("END");
    navigate(`/summary/${room.id}`);
  }, [changePhase, navigate]);

  return {
    showToNextPhaseButton,
    showEndMeetingButton,
    toNextPhase,
    endMeeting,
    canChangeToNextPhase,
  };
};

export default useFloatingButtonBar;
