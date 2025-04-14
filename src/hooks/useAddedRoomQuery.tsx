import { useQuery } from "@tanstack/react-query";
import { getAddedRooms } from "@/api/room";

const useAddedRoomQuery = () => {
  return useQuery({
    queryKey: ["rooms", "added"],
    queryFn: getAddedRooms,
    staleTime: 60 * 1000,
  });
};

export default useAddedRoomQuery;
