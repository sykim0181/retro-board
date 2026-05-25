import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { updateUserName } from "@/store/userSlice";
import { generateRandomName } from "@/utils/user";
import UserAvatar from "./UserAvatar";
import { RotateCcw } from "lucide-react";

interface WelcomeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WelcomeDialog = ({ open, onOpenChange }: WelcomeDialogProps) => {
  const user = useAppSelector((state) => state.user.user);
  const [name, setName] = useState(() => user.name);
  const dispatch = useAppDispatch();

  const onClickStart = () => {
    if (name.trim() === "") return;
    dispatch(updateUserName(name.trim()));
    onOpenChange(false);
  };

  const onClickRandom = () => {
    setName(generateRandomName());
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader className="items-center text-center">
          <DialogTitle className="text-xl">Welcome to RetroBoard!</DialogTitle>
          <DialogDescription>
            시작하기 전에 이름을 설정해주세요.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-[1.5rem] py-[0.5rem]">
          <UserAvatar userName={name || user.name} size={72} />

          <div className="w-full flex items-center gap-[0.5rem]">
            <div className="relative flex-1">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="이름을 입력하세요"
                maxLength={30}
                onKeyDown={(e) => e.key === "Enter" && onClickStart()}
              />
            </div>
            <Button variant="outline" size="icon" onClick={onClickRandom}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>

          <Button className="w-full" onClick={onClickStart} disabled={name.trim() === ""}>
            시작하기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeDialog;
