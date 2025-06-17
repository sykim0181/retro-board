import { useEventListener } from "@liveblocks/react/suspense";
import { useNavigate } from "react-router";
import { toast } from "sonner";

interface RoomAlertProps {
  roomId: string;
}

const RoomAlert = (props: RoomAlertProps) => {
  const { roomId } = props;

  const navigate = useNavigate();

  useEventListener(({ event }) => {
    if (event.type === "PHASE_CHANGE") {
      const phase = event.phase;
      let phaseStr = phase === "END" ? "summary" : phase.toLowerCase();
      toast(`Phase has been changed to "${phaseStr}"`, {
        description: `Please move to ${phaseStr} page!`,
        action: {
          label: "Move",
          onClick: () => {
            if (phase === "END") {
              navigate(`/summary/${roomId}`);
            } else {
              navigate(`/room/${roomId}/${phase}`);
            }
          },
        },
        duration: Infinity,
      });
    }
  });

  return null;
};

export default RoomAlert;
