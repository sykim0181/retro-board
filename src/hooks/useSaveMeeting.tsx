import { useRoomContext } from "@/context/RoomContext";

interface useSaveMeetingProps {
  roomId: string;
}

const useSaveMeeting = (_props: useSaveMeetingProps) => {
  const { saveMeeting } = useRoomContext();
  return { saveMeeting };
};

export default useSaveMeeting;
