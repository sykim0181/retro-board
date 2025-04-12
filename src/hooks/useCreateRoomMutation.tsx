import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createRoom } from "@/api/room";

const useCreateRoomMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation<
    void,
    Error,
    { roomName: string; userId: string }
  >({
    mutationFn: ({ roomName, userId }) => createRoom(roomName, userId),
    onError: (error) => {
      console.log(error);
      toast("Fail to create a room.");
    },
    onSuccess: () => {
      toast("Succeed to create a room.");
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
  });

  return {
    mutate,
  };
};

export default useCreateRoomMutation;
