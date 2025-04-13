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
      const phase = event.phase.toLowerCase();
      toast(`Phase has been changed to "${phase}"`, {
        description: `Please move to ${phase} page!`,
        action: {
          label: "Move",
          onClick: () => navigate(`/room/${roomId}/${phase}`),
        },
        duration: Infinity
      });
    }
  });

  return null;
};

export default RoomAlert;
