import { getRoomMeeting } from "@/api/meeting";
import { LoaderFunction } from "react-router";

export const meetingLoader: LoaderFunction = async ({ params }) => {
  const roomId = params.roomId;
  if (!roomId) {
    throw new Error("Invalid room id");
  }
  const meeting = await getRoomMeeting(roomId);
  console.log("meeting:", meeting);
  return meeting;
};
