import { ClientSideSuspense } from "@liveblocks/react";
import { ComponentProps, createContext, useContext } from "react";
import { useOutletContext } from "react-router";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { TRoom } from "@/types/types";

type RoomContext = {
  room: TRoom;
};

const RoomContext = createContext<RoomContext | null>(null);

export const useRoomContext = () => {
  const roomContext = useContext(RoomContext);

  if (!roomContext) {
    throw new Error("Use useRoomContext within RoomContext.Provider");
  }

  return roomContext;
};

const ContentBody = ({ children, className }: ComponentProps<"div">) => {
  const { room } = useOutletContext<{ room: TRoom }>();

  return (
    <RoomContext.Provider value={{ room }}>
      <div className={cn(["flex-1 overflow-hidden", className])}>
        <ClientSideSuspense
          fallback={
            <div className="w-full flex justify-center items-center">
              <Spinner />
            </div>
          }
        >
          {children}
        </ClientSideSuspense>
      </div>
    </RoomContext.Provider>
  );
};

export default ContentBody;
