"use client";

import { useTransition } from "react";
import { usePathname } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { createTransfer } from "@/lib/actions/order.actions";

type TransferConfirmationProps = {
  amount: number;
  destination: string;
  transfer_group: string;
};

export const TransferConfirmation = ({
  amount,
  destination,
  transfer_group,
}: TransferConfirmationProps) => {
  const pathname = usePathname();
  let [isPending, startTransition] = useTransition();

  const transfer = {
    amount: Number((amount * 100).toFixed(0)),
    destination,
    transfer_group,
    path: pathname,
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>Transfer</AlertDialogTrigger>

      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogDescription className="p-regular-16 text-grey-600">
            {`Are you sure you want to transfer $${amount.toFixed(
              2
            )} to ${destination}?`}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={() =>
              startTransition(async () => {
                await createTransfer(transfer);
              })
            }
          >
            {isPending ? "Transferring..." : "Transfer"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
