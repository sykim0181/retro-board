import { useCallback, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Button } from "../ui/button";
import { updateUserName } from "@/store/userSlice";

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

  return (
    <Dialog>
      {trigger}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>

        <div>
          <div className="grid grid-cols-4">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
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
