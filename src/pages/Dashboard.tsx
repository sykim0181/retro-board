import Avvvatars from "avvvatars-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppSelector } from "@/store/store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OwnedRoomList from "@/components/dashboard/OwnedRoomList";
import AddedRoomList from "@/components/dashboard/AddedRoomList";
import { Button } from "@/components/ui/button";
import EditProfileDialog from "@/components/common/EditProfileDialog";

const Dashboard = () => {
  const user = useAppSelector((state) => state.user.user);

  return (
    <>
      <h1 className="text-start font-bold text-[2rem]">Dashboard</h1>

      <div className="flex items-center gap-[1rem]">
        <Avvvatars value={user.name} />
        <EditProfileDialog
          trigger={<Button variant="ghost">{user.name}</Button>}
        />
      </div>

      <Card className="p-[2rem]">
        <div className="flex">
          <CardHeader className="flex-1">
            <CardTitle>Rooms</CardTitle>
          </CardHeader>
        </div>

        <div>
          <Tabs defaultValue="owned">
            <TabsList>
              <TabsTrigger value="owned">Created</TabsTrigger>
              <TabsTrigger value="added">Added</TabsTrigger>
            </TabsList>

            <TabsContent value="owned" className="flex flex-col gap-[1rem]">
              <OwnedRoomList />
            </TabsContent>
            <TabsContent value="added" className="flex flex-col gap-[1rem]">
              <AddedRoomList />
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </>
  );
};

export default Dashboard;
