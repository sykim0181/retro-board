import { useEffect, useState } from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OwnedRoomList from "@/components/dashboard/OwnedRoomList";
import AddedRoomList from "@/components/dashboard/AddedRoomList";
import WelcomeDialog from "@/components/common/WelcomeDialog";
import { checkFirstVisit } from "@/utils/user";

const Dashboard = () => {
  const [welcomeOpen, setWelcomeOpen] = useState(false);

  useEffect(() => {
    if (checkFirstVisit()) setWelcomeOpen(true);
  }, []);

  return (
    <>
      <WelcomeDialog open={welcomeOpen} onOpenChange={setWelcomeOpen} />
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
