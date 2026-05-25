import { CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OwnedRoomList from "@/components/dashboard/OwnedRoomList";
import AddedRoomList from "@/components/dashboard/AddedRoomList";

const Dashboard = () => {
  return (
    <>
      <CardHeader className="px-0 pt-0">
        <CardTitle>Rooms</CardTitle>
      </CardHeader>
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
    </>
  );
};

export default Dashboard;
