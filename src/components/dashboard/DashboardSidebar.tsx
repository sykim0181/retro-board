import { useAppSelector } from "@/store/store";
import UserAvatar from "@/components/common/UserAvatar";
import { Link, useLocation } from "react-router";
import { LayoutDashboardIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { sidebarMenuButtonVariants } from "@/components/ui/sidebar";
import EditProfileDialog from "@/components/common/EditProfileDialog";
import { Button } from "@/components/ui/button";

const DashboardSidebar = () => {
  const user = useAppSelector((state) => state.user.user);
  const location = useLocation();
  const isActive = location.pathname === "/dashboard";

  return (
    <aside className="hidden md:flex flex-col w-[256px] shrink-0 border-r p-[1rem] gap-16">
      <div className="flex flex-col items-center gap-[0.5rem] pt-[1rem]">
        <UserAvatar userName={user.name} size={64} />
        <EditProfileDialog
          trigger={
            <Button variant="ghost" className="h-auto py-1 px-2 text-base ">
              {user.name}
            </Button>
          }
        />
      </div>
      <nav>
        <Link
          to="/dashboard"
          className={cn(
            sidebarMenuButtonVariants({ size: "default" }),
            isActive &&
              "bg-sidebar-accent font-medium text-sidebar-accent-foreground",
          )}
        >
          <LayoutDashboardIcon />
          <span>Dashboard</span>
        </Link>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
