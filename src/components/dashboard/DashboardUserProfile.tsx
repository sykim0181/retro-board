import { useAppSelector } from "@/store/store";
import EditProfileDialog from "@/components/common/EditProfileDialog";
import { Button } from "@/components/ui/button";
import UserAvatar from "../common/UserAvatar";

const DashboardUserProfile = () => {
  const user = useAppSelector((state) => state.user.user);

  return (
    <div>
      <EditProfileDialog
        trigger={
          <Button variant="ghost" className="p-0">
            <UserAvatar userName={user.name} />
            <span>{user.name}</span>
          </Button>
        }
      />
    </div>
  );
};

export default DashboardUserProfile;
