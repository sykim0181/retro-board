import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteRoom } from "@/api/room";
import { TRoom } from "@/types/types";

const useDeleteRoomMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation<void, Error, { room: TRoom }>({
    mutationFn: ({ room }) => deleteRoom(room.id),
    onError: (error) => {
      console.log(error);
      toast.error("Fail to delete the room.");
    },
    onSuccess: (_, { room }) => {
      toast("Succeed to delete the room.");
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      queryClient.invalidateQueries({
        queryKey: ["rooms", "owned", room.ownerId],
      });
    },
  });

  return {
    mutate,
  };
};

export default useDeleteRoomMutation;
