import { TTask, TTopic } from "@/types/types";
import { useRoom } from "@liveblocks/react/suspense";
import { useCallback } from "react";
import useSaveMeetingMutation from "./useSaveMeetingMutation";

interface useSaveMeetingProps {
  roomId: string;
}

const useSaveMeeting = (props: useSaveMeetingProps) => {
  const { roomId } = props;

  const room = useRoom();

  const { mutate } = useSaveMeetingMutation({ roomId });

  const saveMeeting = useCallback(
    (onSuccess?: () => void, onError?: (error: Error) => void) => {
      const snapshot = room.getStorageSnapshot();
      if (!snapshot) {
        return;
      }

      const topicList = snapshot.get("topics").toImmutable() as TTopic[];
      const taskList = Array.from(
        snapshot.get("tasks").toImmutable().values()
      ) as TTask[];

      mutate(
        { topicList, taskList },
        {
          onSuccess,
          onError,
        }
      );
    },
    [room, mutate]
  );

  return {
    saveMeeting,
  };
};

export default useSaveMeeting;
