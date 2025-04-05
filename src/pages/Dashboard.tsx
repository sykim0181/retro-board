import Avvvatars from "avvvatars-react";
import CreateRoomDialog from "@/components/dashboard/CreateRoomDialog";
import RoomList from "@/components/dashboard/RoomList";
import { Card } from "@/components/ui/card";
import { getUser } from "@/utils";

const Dashboard = () => {
  const user = getUser();

  return (
    <>
      <h1 className="text-start font-bold text-[2rem]">Dashboard</h1>

      <div className="flex items-center gap-[1rem]">
        <Avvvatars value={user.name} />
        <p>{user.name}</p>
      </div>

      <Card className="p-[2rem]">
        <div className="flex items-center">
          <h2 className="text-start font-bold block flex-1">Rooms</h2>
          <CreateRoomDialog />
        </div>

        <RoomList />
      </Card>
    </>
  );
};

export default Dashboard;
