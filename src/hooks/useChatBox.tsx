import { useAppSelector } from "@/store/store";
import { TTask } from "@/types/types";
import { useRoomContext } from "@/context/RoomContext";
import { nanoid } from "nanoid";

interface useChatBoxProps {
  topicIdx: number;
}

const useChatBox = (props: useChatBoxProps) => {
  const { topicIdx } = props;
  const { send } = useRoomContext();
  const user = useAppSelector((state) => state.user.user);

  const addTask = () => {
    const newTask: TTask = {
      id: nanoid(),
      user,
      content: "",
      createdAt: new Date().toISOString(),
    };
    send({ type: "ADD_TASK", topicIndex: topicIdx, task: newTask });
  };

  return { addTask };
};

export default useChatBox;
