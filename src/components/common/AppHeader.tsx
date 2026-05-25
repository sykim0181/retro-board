import { useAppSelector } from "@/store/store";
import AppLogo from "./AppLogo";
import EditProfileDialog from "./EditProfileDialog";
import UserAvatar from "./UserAvatar";
import { Button } from "../ui/button";

const AppHeader = () => {
  const user = useAppSelector((state) => state.user.user);

  return (
    <header className="flex items-center justify-between px-[1rem] h-[60px] border-b bg-white shrink-0">
      <AppLogo />
      <EditProfileDialog
        trigger={
          <Button variant="ghost" size="icon" className="rounded-full">
            <UserAvatar userName={user.name} size={32} />
          </Button>
        }
      />
    </header>
  );
};

export default AppHeader;
