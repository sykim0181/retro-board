import useCheckAccess from "@/hooks/useCheckAccess";
import { TRoom, TRoomPhase } from "@/types/types";
import { useStorage } from "@liveblocks/react/suspense";
import { useEffect, useMemo } from "react";
import { matchPath, useLocation, useNavigate } from "react-router";

interface RoomAccessGuardProps {
  room: TRoom;
}

const RoomAccessGuard = (props: RoomAccessGuardProps) => {
  const { room } = props;

  const phase = useStorage((root) => root.phase);
  const { canAccess } = useCheckAccess();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  // 현재 진입한 페이지가 해당하는 단계
  const pagePhase = useMemo((): TRoomPhase | null => {
    if (matchPath("/room/:roomId/reflect", pathname)) {
      return "REFLECT";
    } else if (matchPath("/room/:roomId/vote", pathname)) {
      return "VOTE";
    } else if (matchPath("/room/:roomId/discuss", pathname)) {
      return "DISCUSS";
    } else {
      return null;
    }
  }, [pathname]);

  useEffect(() => {
    if (!pagePhase) {
      return;
    }

    if (!canAccess(pagePhase)) {
      // 접근할 수 없는 페이지 -> 현재 단계의 페이지로 리다이렉트
      const baseUrl = `/room/${room.id}`;
      switch (phase) {
        case "REFLECT": {
          navigate(`${baseUrl}/reflect`);
          break;
        }
        case "VOTE": {
          navigate(`${baseUrl}/vote`);
          break;
        }
        case "DISCUSS": {
          navigate(`${baseUrl}/discuss`);
          break;
        }
        case "END": {
          navigate(`/summary/${room.id}`);
          break;
        }
        default: {
          break;
        }
      }
    }
  }, [canAccess, pagePhase, phase, navigate]);

  return null;
};

export default RoomAccessGuard;
