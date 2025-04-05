import { ClientSideSuspense } from "@liveblocks/react";
import Board from "../components/Board";
import { Spinner } from "../components/ui/spinner";

const Reflect = () => {
  return (
    <div className="h-full flex flex-col gap-[2rem]">
      <div className="flex flex-col gap-[.5rem]">
        <h1 className="font-bold">Reflect</h1>
        <p className="text-gray-500">Add a card and drag cards by topic.</p>
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
