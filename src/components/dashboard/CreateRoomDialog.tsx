import React, { useCallback, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button, buttonVariants } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import useCreateRoomMutation from "@/hooks/useCreateRoomMutation";
import { useAppSelector } from "@/store/store";

const CreateRoomDialog = () => {
  const [name, setName] = useState("");

  const { mutate } = useCreateRoomMutation();
  const user = useAppSelector((state) => state.user.user);

  const onClickSaveButton = useCallback(
    async (e: React.MouseEvent) => {
      if (name === "") {
        e.stopPropagation();
        return;
      }
      // 방 생성
      mutate({ userId: user.id, roomName: name });
    },
    [name, mutate, user]
  );

  return (
    <Dialog>
      <DialogTrigger className={cn(buttonVariants())}>
        Create room
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create room</DialogTitle>
          <DialogDescription>
            Fill out the information of a room you want to create.
          </DialogDescription>
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

export default CreateRoomDialog;
