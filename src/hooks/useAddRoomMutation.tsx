import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { addRoom } from "@/api/room";

const useAddRoomMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation<void, Error, { roomId: string }>({
    mutationFn: ({ roomId }) => addRoom(roomId),
    onError: (error) => {
      console.log(error);
      toast.error("Fail to add the room.", {
        description: error.message,
      });
    },
    onSuccess: () => {
      toast("Succeed to add the room.");
      queryClient.invalidateQueries({ queryKey: ["rooms", "added"] });
    },
  });

  return {
    mutate,
  };
};

export default useAddRoomMutation;
