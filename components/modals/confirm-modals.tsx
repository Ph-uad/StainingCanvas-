"use-client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"; 

interface ConfirmModalProps {
  children: React.ReactNode;
  onConfirm: (e: any) => void;
}

export const ConfirmModal = ({ children, onConfirm }: ConfirmModalProps) => {
  const handleConfirm = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    onConfirm(e);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger onClick={(e) => e.stopPropagation()}>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure ¿</AlertDialogTitle>
          <AlertDialogDescription>
            This action can NOT be undone
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction onClick={handleConfirm}>Confirm</AlertDialogAction>
      </AlertDialogContent>
    </AlertDialog>
  );
};
