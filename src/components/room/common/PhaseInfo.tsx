import { PencilIcon } from "lucide-react";
import usePhaseInfo from "@/hooks/usePhaseInfo";
import { TRoomPhase } from "@/types/types";
import { useRoomContext } from "./ContentBody";

interface PhaseInfoProps {
  pagePhase: TRoomPhase;
}

const PhaseInfo = (props: PhaseInfoProps) => {
  const { pagePhase } = props;

  const { room } = useRoomContext();
  const { isCompleted, changePhase, isOwnerOfRoom } = usePhaseInfo({
    pagePhase,
    room,
  });

  const onClickEditButton = () => {
    changePhase();
  };

  return (
    isCompleted && (
      <div className="flex justify-center items-center gap-[1rem] p-[0.5rem]">
        <div className="bg-gray-500 text-white font-bold px-[0.8rem] py-[0.3rem] rounded-sm text-[0.9rem]">
          Phase Completed
        </div>

        {isOwnerOfRoom && (
          <button
            className="flex gap-[0.5rem] cursor-pointer"
            onClick={onClickEditButton}
          >
            <PencilIcon width="1rem" />
            <span className="text-[0.9rem] font-bold">Edit</span>
          </button>
        )}
      </div>
    )
  );
};

export default PhaseInfo;
