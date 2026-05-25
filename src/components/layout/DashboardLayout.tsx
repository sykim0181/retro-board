import { Outlet } from "react-router";
import { Card } from "../ui/card";
import AppLogo from "../common/AppLogo";
import DashboardSidebar from "../dashboard/DashboardSidebar";
import { useAppSelector } from "@/store/store";
import EditProfileDialog from "../common/EditProfileDialog";
import UserAvatar from "../common/UserAvatar";
import { Button } from "../ui/button";

const DashboardLayout = () => {
  const user = useAppSelector((state) => state.user.user);

  return (
    <div className="h-dvh flex flex-col">
      <header className="flex items-center justify-between px-[1rem] py-[0.5rem] border-b bg-white shrink-0">
        <AppLogo />
        <EditProfileDialog
          trigger={
            <Button variant="ghost" size="icon" className="rounded-full">
              <UserAvatar userName={user.name} size={32} />
            </Button>
          }
        />
      </header>
      <div className="flex flex-1 min-h-0">
        <DashboardSidebar />
        <main className="flex-1 overflow-auto py-[1rem] px-[1rem] md:px-[2rem] flex flex-col gap-6">
          <h1 className="text-start font-bold text-[2rem]">Dashboard</h1>
          <Card className="p-[1rem] md:p-[2rem] flex-1">
            <Outlet />
          </Card>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
