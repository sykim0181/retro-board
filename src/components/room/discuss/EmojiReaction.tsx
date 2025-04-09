import { Emoji, EmojiStyle } from "emoji-picker-react";
import { useMemo, useState } from "react";
import { TEmoji, TReaction } from "@/types/types";
import { getUser } from "@/utils";

interface EmojiReactionProps {
  reaction: TReaction;
  handleEmojiClicked: (emoji: TEmoji) => void;
}

const EmojiReaction = (props: EmojiReactionProps) => {
  const { reaction, handleEmojiClicked } = props;

  const [showInfo, setShowInfo] = useState(false);

  const user = useMemo(() => getUser(), []);

  return (
    <div className="relative">
      <button
        className="flex gap-[0.5rem]"
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

      {showInfo && (
        <div className="absolute left-[50%] text-[0.8rem] bg-gray-700 text-white px-[0.5rem] py-[0.2rem] text-center transform-[translateX(-50%)] rounded-sm">
          <span className="font-bold">
            {reaction.users
              .map((val) => (val.name === user.name ? "You" : val.name))
              .join(", ")}
          </span>
          <span className="whitespace-nowrap">{` reacted with ${reaction.emoji.name}`}</span>
        </div>
      )}
    </div>
  );
};

export default EmojiReaction;
