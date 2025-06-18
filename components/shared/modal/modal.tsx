import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

type Props = {
  // isOpen: boolean;
  // onOpenChange: (open: boolean) => void;
  title: ReactNode;
  children: ReactNode;
  className?: string;
};

export const Modal = ({ title, children, className = "" }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild aria-describedby="open modal">
        <Button variant="outline">{title}</Button>
      </DialogTrigger>

      <DialogContent
        aria-describedby="content"
        aria-description="content"
        className={className}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
};
