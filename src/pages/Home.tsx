import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getUser } from "@/utils";
import Avvvatars from "avvvatars-react";

const Home = () => {
  const user = getUser();

  return (
    <main className="min-h-dvh flex flex-col justify-center items-center gap-[2rem] p-[2rem]">
      <h1 className="text-[2.5rem]">Retro Board</h1>

      <Card className="w-full max-w-[500px] flex flex-col gap-[2rem] p-[2rem]">
        <div className="flex flex-col items-center gap-[1rem]">
          <Avvvatars value={user.name} />
          <p className="text-[1.2rem]">{user.name}</p>
        </div>
        <Button className="py-[1.5rem]">시작하기</Button>
      </Card>
    </main>
  );
};

export default Home;
