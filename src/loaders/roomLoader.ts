import { getRoomById } from "@/api/room";
import { LoaderFunction } from "react-router";

export const roomLoader: LoaderFunction = async ({ params }) => {
  const roomId = params.roomId;
  if (!roomId) {
    throw new Error("Invalid room id");
  }
  const room = await getRoomById(roomId);
  return room;
};
