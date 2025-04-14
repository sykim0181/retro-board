import { useCallback } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import useDeleteRoomMutation from "@/hooks/useDeleteRoomMutation";
import { TRoom } from "@/types/types";

interface DeleteRoomAlertDialogProps {
  room: TRoom;
  open: boolean;
  closeDialog: () => void;
}

const DeleteRoomAlertDialog = (props: DeleteRoomAlertDialogProps) => {
  const { room, open, closeDialog } = props;

  const { mutate } = useDeleteRoomMutation();

  const onClickContinueButton = useCallback(() => {
    mutate({ room });
  }, [room, mutate]);

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={closeDialog} className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onClickContinueButton}
            className="cursor-pointer"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteRoomAlertDialog;
