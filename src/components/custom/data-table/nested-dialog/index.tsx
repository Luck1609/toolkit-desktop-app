import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUserRound } from "lucide-react";
import Link from "next/link";
import DialogItem from "./item";

export default function NestedDialog({ trigger, options }) {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [hasOpenDialog, setHasOpenDialog] = React.useState(false);
  const dropdownTriggerRef = React.useRef(null);
  const focusRef = React.useRef(null);

  function handleDialogItemSelect() {
    focusRef.current = dropdownTriggerRef.current;
  }

  function handleDialogItemOpenChange(open: boolean) {
    setHasOpenDialog(open);
    if (open === false) {
      setDropdownOpen(false);
    }
  }

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger
        className="flex rounded-md border border-color px-4 py-2 font-semibold"
        ref={dropdownTriggerRef}
      >
        {trigger}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40">
        
        <DropdownMenuItem className="text-center">
          My Account
        </DropdownMenuItem>
        <DialogItem
          triggerChildren={{
            Icon: null,
            text: ''
          }}
          onSelect={handleDialogItemSelect}
          onOpenChange={handleDialogItemOpenChange}
          data={{
            title: '',
            description: '',
            action: () => {}
          }}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
