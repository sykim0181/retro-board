import { Outlet } from "react-router";
import { Card } from "../ui/card";
import DashboardSidebar from "../dashboard/DashboardSidebar";
import AppHeader from "../common/AppHeader";

const DashboardLayout = () => {
  return (
    <div className="h-dvh flex flex-col">
      <AppHeader />
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
