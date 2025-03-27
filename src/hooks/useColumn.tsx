import { useAppSelector } from "@/lib/boardStore";
import { TColumnType } from "@/types/types";

interface usecolumnProps {
  type: TColumnType;
}

const useColumn = (props: usecolumnProps) => {
  const { type } = props;

  const cards = useAppSelector((state) => {
    switch (type) {
      case "START": {
        return state.start.cards;
      }
      case "END": {
        return state.end.cards;
      }
      case "CONTINUE": {
        return state.continue.cards;
      }
      default: {
        return [];
      }
    }
  });

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
    cards,
    someoneIsTyping,
  };
};

export default useColumn;
