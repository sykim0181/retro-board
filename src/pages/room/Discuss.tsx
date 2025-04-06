import { ClientSideSuspense } from "@liveblocks/react";
import { Spinner } from "@/components/ui/spinner";
import { useParams } from "react-router";
import DiscussContent from "@/components/room/discuss/DiscussContent";

const Discuss = () => {
  const params = useParams();

  if (!params.cardIdx) {
    throw new Error("Invalid Card Index");
  }

  const cardIdx = Number(params.cardIdx);

  return (
    <div className="h-full flex flex-col gap-[2rem]">
      <div className="flex flex-col gap-[.5rem]">
        <h1 className="font-bold">Discuss</h1>
        <p className="text-gray-500 text-[0.9rem]">
          Start the conversation about the task card.
        </p>
      </div>

      <div className="flex-1 overflow-y-hidden">
        <ClientSideSuspense
          fallback={
            <div className="w-full flex justify-center items-center">
              <Spinner />
            </div>
          }
        >
          <DiscussContent cardIdx={cardIdx} />
        </ClientSideSuspense>
      </div>
    </div>
  );
};

export default Discuss;
