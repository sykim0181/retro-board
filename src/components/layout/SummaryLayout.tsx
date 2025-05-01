import { initialRoomStorage } from "@/constants";
import { ClientSideSuspense, RoomProvider } from "@liveblocks/react";
import { Outlet, useParams } from "react-router";
import { Card } from "../ui/card";
import { Spinner } from "../ui/spinner";

const SummaryLayout = () => {
  const params = useParams();
  const roomId = params.roomId;

  if (!roomId) {
    throw new Error("Invalid room id");
  }

  return (
    <RoomProvider
      id={roomId}
      initialStorage={initialRoomStorage}
      initialPresence={{
        name: "unknown",
      }}
    >
      <Card className="p-[1rem] m-[1rem]">
        <ClientSideSuspense
          fallback={
            <div className="w-full min-h-dvh flex justify-center items-center">
              <Spinner />
            </div>
          }
        >
          <Outlet />
        </ClientSideSuspense>
      </Card>
    </RoomProvider>
  );
};

export default SummaryLayout;
