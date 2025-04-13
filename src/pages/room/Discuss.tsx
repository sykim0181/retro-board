import { ClientSideSuspense } from "@liveblocks/react/suspense";
import { Spinner } from "@/components/ui/spinner";
import DiscussContent from "@/components/room/discuss/DiscussContent";
import ContentHeader from "@/components/room/common/ContentHeader";

const Discuss = () => {
  return (
    <div className="h-full flex flex-col gap-[2rem]">
      <ContentHeader.Wrapper>
        <ContentHeader.Title>Discuss</ContentHeader.Title>
        <ContentHeader.Description>
          Start the conversation about the task card.
        </ContentHeader.Description>
      </ContentHeader.Wrapper>

      <div className="flex-1 overflow-y-hidden">
        <ClientSideSuspense
          fallback={
            <div className="w-full flex justify-center items-center">
              <Spinner />
            </div>
          }
        >
          <DiscussContent />
        </ClientSideSuspense>
      </div>
    </div>
  );
};

export default Discuss;
