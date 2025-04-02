import CreateRoomDialog from "@/components/dashboard/CreateRoomDialog";
import RoomList from "@/components/dashboard/RoomList";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  return (
    <main className="p-[2rem]">
      <h1>Rooms</h1>

      <div>
        <div className="flex justify-end">
          <CreateRoomDialog trigger={<Button>Create room</Button>} />
        </div>

        <RoomList />
      </div>
    </main>
  );
};

export default Dashboard;
