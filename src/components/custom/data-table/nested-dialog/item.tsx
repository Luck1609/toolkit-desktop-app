import * as React from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LucidIcon } from "@/data/admin/types";

type DialogItemType = {
  triggerChildren: {
    text: string;
    Icon: LucidIcon | null
  };
  onSelect: () => void;
  data: {
    title: string;
    description: string;
    url: string
  }
  onOpenChange: (open: boolean) => void;
};

const DialogItem = React.forwardRef(
  (props: DialogItemType, forwardedRef: React.Ref<HTMLDivElement>) => {
    const { triggerChildren: {Icon, text}, data: {title, description, url}, children, onSelect, onOpenChange, ...itemProps } =
      props;

    return (
      <AlertDialog onOpenChange={onOpenChange}>
        <AlertDialogTrigger asChild>
          <DropdownMenuItem
            {...itemProps}
            ref={forwardedRef}
            className="DropdownMenuItem"
            onSelect={(event) => {
              event.preventDefault();
              onSelect && onSelect();
            }}
          >
            <span className="flex items-center space-x-2">
              {
                Icon && <Icon size={18} />
              }
              <span>{text}</span>
            </span>
          </DropdownMenuItem>
        </AlertDialogTrigger>

        <AlertDialogPortal>
          <AlertDialogOverlay className="DialogOverlay" />
            <AlertDialogContent className="DialogContent">
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {title}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {description}
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel className="bg-danger">Cancel</AlertDialogCancel>
                <AlertDialogAction className="flex items-center space-x-2">
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialogPortal>
      </AlertDialog>
    );
  },
);

DialogItem.displayName = "DialogItem";

export default DialogItem;
