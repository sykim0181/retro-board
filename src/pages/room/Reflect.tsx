import { useOutletContext } from "react-router";
import { ClientSideSuspense } from "@liveblocks/react/suspense";
import { Spinner } from "../../components/ui/spinner";
import Board from "@/components/room/reflect/Board";
import PhaseInfo from "@/components/room/common/PhaseInfo";
import { TRoom } from "@/types/types";

const Reflect = () => {
  const { room } = useOutletContext<{ room: TRoom }>();

  return (
    <div className="h-full flex flex-col gap-[2rem]">
      <div className="flex flex-col gap-[.5rem]">
        <h1 className="font-bold">Reflect</h1>
        <p className="text-gray-500 text-[0.9rem]">
          Add a card and drag cards by topic.
        </p>
      </div>

      <div className="flex-1 overflow-y-hidden flex flex-col">
        <ClientSideSuspense
          fallback={
            <div className="w-full flex justify-center items-center">
              <Spinner />
            </div>
          }
        >
          <PhaseInfo pagePhase="REFLECT" room={room} />
          <Board />
        </ClientSideSuspense>
      </div>
    </div>
  );
};

export default Reflect;
