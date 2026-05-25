import { useRoomContext } from "@/context/RoomContext";
import { TRoomPhase } from "@/types/types";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

interface RoomAlertProps {
  roomId: string;
}

const RoomAlert = (props: RoomAlertProps) => {
  const { roomId } = props;
  const { state, isSynced } = useRoomContext();
  const navigate = useNavigate();
  const prevPhaseRef = useRef<TRoomPhase | null>(null);

  useEffect(() => {
    if (!isSynced) return;

    // isSynced가 true가 된 직후 현재 phase를 기준으로 설정
    if (prevPhaseRef.current === null) {
      prevPhaseRef.current = state.phase;
      return;
    }

    if (prevPhaseRef.current === state.phase) return;
    prevPhaseRef.current = state.phase;

    const phase = state.phase;
    const phaseStr = phase === "END" ? "summary" : phase.toLowerCase();

    toast(`Phase has been changed to "${phaseStr}"`, {
      description: `Please move to ${phaseStr} page!`,
      action: {
        label: "Move",
        onClick: () => {
          if (phase === "END") {
            navigate(`/summary/${roomId}`);
          } else {
            navigate(`/room/${roomId}/${phase.toLowerCase()}`);
          }
        },
      },
      duration: Infinity,
    });
  }, [state.phase, isSynced, roomId, navigate]);

  return null;
};

export default RoomAlert;
