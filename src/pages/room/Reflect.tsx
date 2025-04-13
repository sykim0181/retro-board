import { useOutletContext } from "react-router";
import { ClientSideSuspense } from "@liveblocks/react/suspense";
import { Spinner } from "../../components/ui/spinner";
import Board from "@/components/room/reflect/Board";
import PhaseInfo from "@/components/room/common/PhaseInfo";
import { TRoom } from "@/types/types";
import ContentHeader from "@/components/room/common/ContentHeader";

const Reflect = () => {
  const { room } = useOutletContext<{ room: TRoom }>();

  return (
    <div className="h-full flex flex-col gap-[1.5rem]">
      <ContentHeader.Wrapper>
        <ContentHeader.Title>Reflect</ContentHeader.Title>
        <ContentHeader.Description>
          Add a card and drag cards by topic.
        </ContentHeader.Description>
      </ContentHeader.Wrapper>

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
