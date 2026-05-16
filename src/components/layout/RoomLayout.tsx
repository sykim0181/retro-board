import { Outlet, useLoaderData, useParams } from "react-router";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import RoomSidebar from "../room/sidebar/RoomSidebar";
import { Card } from "../ui/card";
import { TRoom } from "@/types/types";
import { cn } from "@/lib/utils";
import RoomAlert from "../room/common/RoomAlert";
import RoomErrorBoundary from "../room/common/RoomErrorBoundary";
import User from "../room/common/User";
import FloatingButtonBar from "../room/common/FloatingButtonBar";
import RoomAccessGuard from "../room/common/RoomAccessGuard";
import { RoomContextProvider, useRoomContext } from "@/context/RoomContext";
import { Spinner } from "../ui/spinner";

const RoomLayoutContent = ({ room }: { room: TRoom }) => {
  const { isConnected } = useRoomContext();

  if (!isConnected) {
    return (
      <div className="flex h-dvh items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <SidebarProvider className="h-dvh">
      <RoomSidebar />
      <SidebarInset className={cn(["overflow-hidden"])}>
        <Card className={cn(["h-full", "p-[1rem]"])}>
          <RoomErrorBoundary>
            <Outlet context={{ room }} />
          </RoomErrorBoundary>
        </Card>
        <FloatingButtonBar room={room} />
      </SidebarInset>

      <RoomAlert roomId={room.id} />
      <User />
      <RoomAccessGuard room={room} />
    </SidebarProvider>
  );
};

const RoomLayout = () => {
  const params = useParams();
  const roomId = params.roomId;

  if (!roomId) {
    throw new Error("Invalid room id");
  }

  const room = useLoaderData() as TRoom;

  return (
    <RoomContextProvider roomId={roomId}>
      <RoomLayoutContent room={room} />
    </RoomContextProvider>
  );
};

export default RoomLayout;
