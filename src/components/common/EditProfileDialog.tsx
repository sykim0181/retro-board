import { useCallback, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Button } from "../ui/button";
import { updateUserName } from "@/store/userSlice";
import { RotateCcw } from "lucide-react";
import { generateRandomName } from "@/utils/user";

interface EditProfileDialogProps {
  trigger: React.ReactNode;
}

const EditProfileDialog = (props: EditProfileDialogProps) => {
  const { trigger } = props;

  const user = useAppSelector((state) => state.user.user);
  const [name, setName] = useState(() => user.name);

  const dispatch = useAppDispatch();

  const onClickSaveButton = useCallback(
    (e: React.MouseEvent) => {
      if (name === "") {
        e.stopPropagation();
        return;
      }

      // 이름 변경
      dispatch(updateUserName(name));
    },
    [name, dispatch]
  );

  const onClickRecreateButton = useCallback(() => {
    const newName = generateRandomName();
    setName(newName);
  }, [setName]);

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>

        <div>
          <div className="grid grid-cols-4 relative">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3 pr-[1.5rem]"
              maxLength={30}
            />
            <button
              className="absolute top-1/2 right-[0.5rem] transform-[translateY(-50%)] cursor-pointer"
              onClick={onClickRecreateButton}
            >
              <RotateCcw width="1rem" />
            </button>
          </div>
        </div>

        <DialogFooter>
          <DialogClose>
            <Button onClick={onClickSaveButton}>Save</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
