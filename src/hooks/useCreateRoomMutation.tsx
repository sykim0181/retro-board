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
      toast.error("Fail to create a room.");
    },
    onSuccess: (_, { userId }) => {
      toast("Succeed to create a room.");
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      queryClient.invalidateQueries({ queryKey: ["rooms", "owned", userId] });
    },
  });

  return {
    mutate,
  };
};

export default useCreateRoomMutation;
