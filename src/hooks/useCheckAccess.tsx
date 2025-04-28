import { useAppSelector } from "@/store/store";
import { TRoom, TRoomPhase } from "@/types/types";
import { useCallback, useMemo } from "react";
import { useLoaderData } from "react-router";
import usePhase from "./usePhase";

const useCheckAccess = () => {
  const room = useLoaderData() as TRoom;

  const userId = useAppSelector((state) => state.user.user.id);
  const isOwnerOfRoom = useMemo(() => userId === room.ownerId, [room, userId]);

  const { phase } = usePhase();

  const canAccess = useCallback(
    (targetPhase: TRoomPhase) => {
      const currentPhase = phase;

      if (isOwnerOfRoom) {
        switch (targetPhase) {
          case "REFLECT": {
            return true;
          }
          case "VOTE": {
            return ["VOTE", "DISCUSS", "END"].includes(phase);
          }
          case "DISCUSS": {
            return ["DISCUSS", "END"].includes(phase);
          }
          case "END": {
            return phase === "END";
          }
          default: {
            return false;
          }
        }
      }

      // 일반 멤버는 현재 단계에 해당하는 페이지만 접근 가능
      return targetPhase === currentPhase;
    },
    [phase, isOwnerOfRoom]
  );

  return {
    canAccess,
  };
};

export default useCheckAccess;
