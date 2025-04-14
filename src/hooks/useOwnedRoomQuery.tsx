import { useQuery } from "@tanstack/react-query";
import { getRoomsByOwnerId } from "@/api/room";

interface useOwnedRoomQueryProps {
  userId: string;
}

const useOwnedRoomQuery = (props: useOwnedRoomQueryProps) => {
  const { userId } = props;

  return useQuery({
    queryKey: ["rooms", "owned", userId],
    queryFn: () => getRoomsByOwnerId(userId),
    staleTime: 10 * 60 * 1000,
  });
};

export default useOwnedRoomQuery;
