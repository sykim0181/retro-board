import { Emoji, EmojiStyle } from "emoji-picker-react";
import { useCallback, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { TEmoji, TReaction } from "@/types/types";
import { getUser } from "@/utils";

interface EmojiReactionProps {
  reaction: TReaction;
  handleEmojiClicked: (emoji: TEmoji) => void;
}

const EmojiReaction = (props: EmojiReactionProps) => {
  const { reaction, handleEmojiClicked } = props;

  const [showInfo, setShowInfo] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  const user = useMemo(() => getUser(), []);

  const getButtonPosition = useCallback(() => {
    if (!ref.current) {
      return;
    }

    const boundingRect = ref.current.getBoundingClientRect();
    return {
      left: boundingRect.left + boundingRect.width / 2,
      top: boundingRect.bottom,
    };
  }, [ref]);
  const buttonPosition = useMemo(
    () => (showInfo ? getButtonPosition() : undefined),
    [showInfo]
  );

  return (
    <>
      <button
        ref={ref}
        className="flex gap-[0.5rem] cursor-pointer"
        onClick={() => handleEmojiClicked(reaction.emoji)}
        onMouseEnter={() => setShowInfo(true)}
        onMouseLeave={() => setShowInfo(false)}
      >
        <Emoji
          unified={reaction.emoji.unified}
          emojiStyle={EmojiStyle.NATIVE}
          size={16}
        />
        <span>{reaction.users.length}</span>
      </button>

      {showInfo &&
        createPortal(
          <div
            className="absolute text-[0.8rem] bg-gray-700 text-white px-[0.5rem] py-[0.2rem] text-center transform-[translateX(-50%)] rounded-sm z-10"
            style={{
              left: buttonPosition ? `${buttonPosition.left}px` : undefined,
              top: buttonPosition ? `${buttonPosition.top}px` : undefined,
            }}
          >
            <span className="font-bold">
              {reaction.users
                .map((val) => (val.id === user.id ? "You" : val.name))
                .join(", ")}
            </span>
            <span className="whitespace-nowrap">{` reacted with ${reaction.emoji.name}`}</span>
          </div>,
          document.getElementById("portal")!
        )}
    </>
  );
};

export default EmojiReaction;
