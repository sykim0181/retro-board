import { useAppSelector } from "@/store/store";
import UserAvatar from "@/components/common/UserAvatar";
import { Link, useLocation } from "react-router";
import { LayoutDashboardIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { sidebarMenuButtonVariants } from "@/components/ui/sidebar";

const DashboardSidebar = () => {
  const user = useAppSelector((state) => state.user.user);
  const location = useLocation();
  const isActive = location.pathname === "/dashboard";

  return (
    <aside className="hidden md:flex flex-col w-[256px] shrink-0 border-r p-[1rem] gap-16">
      <div className="flex flex-col items-center gap-[0.5rem] pt-[1rem]">
        <UserAvatar userName={user.name} size={64} />
        <span className="text-sm font-medium">{user.name}</span>
      </div>
      <nav>
        <Link
          to="/dashboard"
          className={cn(
            sidebarMenuButtonVariants({ size: "default" }),
            isActive &&
              "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
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
