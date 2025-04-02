import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { createRoom } from "@/api/room";

interface CreateRoomDialogProps {
  trigger: React.ReactNode;
}

const CreateRoomDialog = (props: CreateRoomDialogProps) => {
  const { trigger } = props;

  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  const submit = async () => {
    if (name === "") {
      return;
    }

    await createRoom(name);
    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogTrigger onClick={() => setOpen(true)}>{trigger}</DialogTrigger>
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
          <Button onClick={submit}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRoomDialog;
