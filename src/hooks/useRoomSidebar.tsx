import { useMemo } from "react";
import { useLoaderData, useParams } from "react-router";
import { TRoom } from "@/types/types";
import { getUser } from "@/utils";

const useRoomSidebar = () => {
  const params = useParams();
  const roomId = params.roomId;

  if (!roomId) {
    throw new Error("Invalid room id");
  }

  const room = useLoaderData() as TRoom;
  
  const user = useMemo(() => getUser(), []);

  const isOwnerOfRoom = useMemo(() => user.id === room.ownerId, [user, room]);

  return {
    room,
    user,
    isOwnerOfRoom,
  };
};

export default useRoomSidebar;
