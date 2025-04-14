import { NavLink } from "react-router";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAppSelector } from "@/store/store";
import EditProfileDialog from "@/components/common/EditProfileDialog";
import { DialogTrigger } from "@/components/ui/dialog";
import UserAvatar from "@/components/common/UserAvatar";

const Home = () => {
  const user = useAppSelector((state) => state.user.user);

  return (
    <main className="min-h-dvh flex flex-col justify-center items-center gap-[2rem] p-[2rem]">
      <h1 className="text-[2.5rem]">Retro Board</h1>

      <Card className="w-full max-w-[500px] flex flex-col gap-[2rem] p-[2rem]">
        <div className="flex flex-col items-center gap-[1rem]">
          <UserAvatar userName={user.name} />
          <div className="grid grid-cols-3 items-center gap-[1rem]">
            <span className="text-[1.2rem] col-start-2">{user.name}</span>
            <EditProfileDialog
              trigger={
                <DialogTrigger className="cursor-pointer">
                  <Pencil height="0.8rem" className="hover:text-gray-500" />
                </DialogTrigger>
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
