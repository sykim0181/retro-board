import { ClientSideSuspense } from "@liveblocks/react/suspense";
import { Spinner } from "../../components/ui/spinner";
import Board from "@/components/room/reflect/Board";

const Reflect = () => {
  return (
    <div className="h-full flex flex-col gap-[2rem]">
      <div className="flex flex-col gap-[.5rem]">
        <h1 className="font-bold">Reflect</h1>
        <p className="text-gray-500 text-[0.9rem]">
          Add a card and drag cards by topic.
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
          <Board />
        </ClientSideSuspense>
      </div>
    </div>
  );
};

export default Reflect;
