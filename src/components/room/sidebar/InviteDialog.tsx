import { UserPlusIcon, Copy } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { sidebarMenuButtonVariants } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface InviteDialogProps {
  roomId: string;
}

const InviteDialog = (props: InviteDialogProps) => {
  const { roomId } = props;

  return (
    <Dialog>
      <DialogTrigger
        className={cn([sidebarMenuButtonVariants({ size: "sm" })])}
      >
        <UserPlusIcon />
        <span>Invite</span>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite team mate</DialogTitle>
          <DialogDescription>
            Share this room ID with your teammate so they can join.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col">
          <div className="flex gap-[0.5rem]">
            <div className="flex-1">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input id="link" defaultValue={roomId} readOnly />
            </div>
            <Button
              size="sm"
              onClick={() => navigator.clipboard.writeText(roomId)}
            >
              <span className="sr-only">Copy</span>
              <Copy />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteDialog;
