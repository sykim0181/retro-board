import { NavLink } from "react-router";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAppSelector } from "@/store/store";
import EditProfileDialog from "@/components/common/EditProfileDialog";
import UserAvatar from "@/components/common/UserAvatar";

const Home = () => {
  const user = useAppSelector((state) => state.user.user);

  return (
    <main className="min-h-dvh flex flex-col justify-center items-center gap-[2rem] p-[2rem]">
      <h1 className="text-[2.5rem]">RetroBoard</h1>

      <Card className="w-full max-w-[500px] flex flex-col gap-[2rem] p-[2rem]">
        <div className="flex flex-col items-center gap-[1rem]">
          <UserAvatar userName={user.name} />
          <div className="relative flex items-center gap-[1rem]">
            <span className="relative text-[1.2rem] col-start-2 text-nowrap">{user.name}</span>
            <EditProfileDialog
              trigger={
                <Button variant="ghost" className="absolute -right-[5rem] cursor-pointer w-fit">
                  <Pencil height="0.8rem" className="hover:text-gray-500" />
                </Button>
              }
            />
          </div>
        </div>
        <Button className="py-[1.5rem] box-border relative">
          <NavLink
            to="/dashboard"
            className="flex w-full h-full absolute justify-center items-center"
          >
            Start
          </NavLink>
        </Button>
      </Card>
    </main>
  );
};

export default Home;
