import { Card } from "@/components/ui/card";
import useFloatingButtonBar from "@/hooks/useFloatingButtonBar";
import { TRoom } from "@/types/types";
import {
  BadgePlusIcon,
  CircleArrowRightIcon,
  FlagIcon,
  LucideIcon,
} from "lucide-react";
import { ComponentProps, memo } from "react";

interface FloatingButtonBarProps {
  room: TRoom;
}

const FloatingButtonBar = (props: FloatingButtonBarProps) => {
  const { room } = props;

  const {
    showAddTaskButton,
    showToNextPhaseButton,
    showEndMeetingButton,
    addTask,
    toNextPhase,
    endMeeting,
    canChangeToNextPhase,
  } = useFloatingButtonBar({ room });

  const showAddTaskDialog = () => {
    // show AddTaskDialog
    addTask("");
  };

  return (
    <Card className="absolute flex flex-row gap-0 bottom-[0.5rem] left-[50%] transform-[translateX(-50%)] overflow-hidden">
      {showToNextPhaseButton && (
        <Button
          icon={CircleArrowRightIcon}
          name="Next"
          onClick={toNextPhase}
          disabled={!canChangeToNextPhase}
        />
      )}
      {showAddTaskButton && (
        <Button
          icon={BadgePlusIcon}
          name="Add Task"
          onClick={showAddTaskDialog}
        />
      )}
      {showEndMeetingButton && (
        <Button icon={FlagIcon} name="End" onClick={endMeeting} />
      )}
    </Card>
  );
};

interface ButtonProps extends ComponentProps<"button"> {
  icon: LucideIcon;
  name: string;
}

const Button = memo((props: ButtonProps) => {
  const { icon, name, ...otherProps } = props;

  const Icon = icon;

  return (
    <button
      className="flex-1 cursor-pointer flex flex-col items-center py-[0.5rem] px-[2rem] hover:bg-gray-100 disabled:hover:cursor-not-allowed disabled:hover:bg-white"
      {...otherProps}
    >
      <Icon height={"2rem"} />
      <span className="text-[0.7rem] text-nowrap">{name}</span>
    </button>
  );
});

export default FloatingButtonBar;
