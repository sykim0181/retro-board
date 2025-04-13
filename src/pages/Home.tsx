import Avvvatars from "avvvatars-react";
import { NavLink } from "react-router";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAppSelector } from "@/store/store";
import EditProfileDialog from "@/components/common/EditProfileDialog";
import { DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const Home = () => {
  const user = useAppSelector((state) => state.user.user);

  return (
    <main className="min-h-dvh flex flex-col justify-center items-center gap-[2rem] p-[2rem]">
      <h1 className="text-[2.5rem]">Retro Board</h1>

      <Card className="w-full max-w-[500px] flex flex-col gap-[2rem] p-[2rem]">
        <div className="flex flex-col items-center gap-[1rem]">
          <Avvvatars value={user.name} />
          <p className="text-[1.2rem]">{user.name}</p>
        </div>
        <div className="flex flex-col gap-[0.5rem]">
          <EditProfileDialog
            trigger={
              <DialogTrigger
                className={cn([buttonVariants(), "cursor-pointer py-[1.5rem]"])}
              >
                Edit
              </DialogTrigger>
            }
          />
          <Button className="py-[1.5rem] box-border relative">
            <NavLink
              to="/dashboard"
              className="flex w-full h-full absolute justify-center items-center"
            >
              Start
            </NavLink>
          </Button>
        </div>
      </Card>
    </main>
  );
};

export default Home;
