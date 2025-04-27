import { useAppSelector } from "@/store/store";
import { TRoom, TRoomPhase } from "@/types/types";
import { useCallback, useMemo } from "react";
import { useLoaderData } from "react-router";
import usePhase from "./usePhase";

const useCheckAccess = () => {
  const room = useLoaderData() as TRoom;

  const userId = useAppSelector((state) => state.user.user.id);
  const isOwnerOfRoom = useMemo(() => userId === room.ownerId, [room, userId]);

  const { phase, canChangePhase } = usePhase();

  const canAccess = useCallback(
    (targetPhase: TRoomPhase) => {
      const currentPhase = phase;

      if (isOwnerOfRoom) {
        return canChangePhase(targetPhase);
      }

      // 일반 멤버는 현재 단계에 해당하는 페이지만 접근 가능
      return targetPhase === currentPhase;
    },
    [phase, isOwnerOfRoom, canChangePhase]
  );

  return {
    canAccess,
  };
};

export default useCheckAccess;
