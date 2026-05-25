import useCheckAccess from "@/hooks/useCheckAccess";
import { TRoom, TRoomPhase } from "@/types/types";
import { useRoomContext } from "@/context/RoomContext";
import { useEffect, useMemo } from "react";
import { matchPath, useLocation, useNavigate } from "react-router";

interface RoomAccessGuardProps {
  room: TRoom;
}

const RoomAccessGuard = (props: RoomAccessGuardProps) => {
  const { room } = props;
  const { state } = useRoomContext();
  const phase = state.phase;
  const { canAccess } = useCheckAccess();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const pagePhase = useMemo((): TRoomPhase | null => {
    if (matchPath("/room/:roomId/reflect", pathname)) return "REFLECT";
    if (matchPath("/room/:roomId/vote", pathname)) return "VOTE";
    if (matchPath("/room/:roomId/discuss", pathname)) return "DISCUSS";
    return null;
  }, [pathname]);

  useEffect(() => {
    if (!pagePhase) return;
    if (!canAccess(pagePhase)) {
      const baseUrl = `/room/${room.id}`;
      switch (phase) {
        case "REFLECT":
          navigate(`${baseUrl}/reflect`);
          break;
        case "VOTE":
          navigate(`${baseUrl}/vote`);
          break;
        case "DISCUSS":
          navigate(`${baseUrl}/discuss`);
          break;
        case "END":
          navigate(`/summary/${room.id}`);
          break;
      }
    }
  }, [canAccess, pagePhase, phase, navigate, room.id]);

  return null;
};

export default RoomAccessGuard;
