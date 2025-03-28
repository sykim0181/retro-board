import { useAppSelector } from "@/lib/boardStore";
import { TColumnType } from "@/types/types";

interface usecolumnProps {
  type: TColumnType;
}

const useColumn = (props: usecolumnProps) => {
  const { type } = props;

  const someoneIsTyping = useAppSelector((state) =>
    state.liveblocks?.others.some((user) => {
      const typingState = user.presence?.typingState;
      if (typingState?.column === type && typingState?.isTyping === true) {
        return true;
      }
      return false;
    })
  );

  return {
    someoneIsTyping,
  };
};

export default useColumn;
