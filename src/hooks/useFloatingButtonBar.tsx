import { useAppSelector } from "@/store/store";
import { TRoom, TTask } from "@/types/types";
import { useMutation } from "@liveblocks/react/suspense";
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
  const showAddTaskButton = useMemo(() => phase === "DISCUSS", [phase]);
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

  /* 버튼 동작 */
  const addTask = useMutation(
    ({ storage }, content: string) => {
      const newTask: TTask = {
        user,
        content,
      };
      storage.get("tasks").push(newTask);
    },
    [user]
  );

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
    // TODO: navigate to summary page
  }, [changePhase]);

  return {
    showAddTaskButton,
    showToNextPhaseButton,
    showEndMeetingButton,
    addTask,
    toNextPhase,
    endMeeting,
    canChangeToNextPhase,
  };
};

export default useFloatingButtonBar;
