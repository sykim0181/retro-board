import { saveMeeting } from "@/api/meeting";
import { TTask, TTopic } from "@/types/types";
import { useMutation } from "@tanstack/react-query";

interface useSaveMeetingMutation {
  roomId: string;
}

const useSaveMeetingMutation = (props: useSaveMeetingMutation) => {
  const { roomId } = props;

  const mutationResult = useMutation<
    void,
    Error,
    {
      topicList: TTopic[];
      taskList: TTask[];
    }
  >({
    mutationFn: ({ topicList, taskList }) =>
      saveMeeting(roomId, topicList, taskList),
  });
  return mutationResult;
};

export default useSaveMeetingMutation;
