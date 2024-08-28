import React, { ReactNode } from 'react'
import { ArchiveRestore, EllipsisVertical, Eye, Pencil, Trash, X } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

import DialogItem from './item'
import { getPayload } from './utils'
import { ActionsData, DialogAlert, DynamicButtonGroup } from '../types'
import { DEACTIVATE, DELETE, RESTORE } from '@/lib/constants';
import { LucidIcon } from '@/lib/global-types'
import { Link } from 'react-router-dom'



const initialActions: Partial<ActionsData> = {
  view: {
    show: false,
    url: ''
  },
  edit: {
    show: false,
    url: ''
  },
  deactivate: {
    show: false,
    status: DEACTIVATE
  },
  delete: false,
  url: '',
  mutate: '',
  name: '',
}



export function DynamicActionButtons({ buttonGroup = [], actions = initialActions }: DynamicButtonGroup) {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [_, setHasOpenDialog] = React.useState(false);
  const dropdownTriggerRef = React.useRef(null);
  const focusRef = React.useRef(null);

  // const 


  function handleDialogItemSelect() {
    focusRef.current = dropdownTriggerRef.current;
  }

  function handleDialogItemOpenChange(open: boolean) {
    setHasOpenDialog(open);
    if (open === false) {
      setDropdownOpen(false);
    }
  }

  const AlertDialog = (
    { Icon, text, data }:
      { Icon: LucidIcon; text: string; data: DialogAlert }
  ) => {
    return (
      <DialogItem
        triggerChildren={{
          Icon,
          text
        }}
        onSelect={handleDialogItemSelect}
        onOpenChange={handleDialogItemOpenChange}
        data={data}
        mutation={actions.mutate ?? ''}
      />
    )
  }

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger
        className="flex rounded-md px-4 py-2 font-semibold"
        ref={dropdownTriggerRef}
      >
        <EllipsisVertical size={18} />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40">
        {
          actions?.view?.show && (
            <DropdownMenuItem>
              <Link to={`${actions?.view.url}`} className="flex space-x-2 items-center">
                <Eye size={18} />
                <span>View</span>  
              </Link>
            </DropdownMenuItem>
          )
        }
        {
          actions?.edit?.show && (
            <DropdownMenuItem>
              <Link to={`${actions.edit.url}`} className="flex space-x-2 items-center">
                <Pencil size={18} />
                <span>Edit</span>  
              </Link>
            </DropdownMenuItem>
          )
        }
        
        {
          buttonGroup.map(({ label, action }: { label: ReactNode;  action: () => void}, index: number) => (
            <DropdownMenuItem onClick={action} key={index.toString()}>{label}</DropdownMenuItem>
          ))
        }

        {
          actions?.deactivate?.show && (
            <>
              <AlertDialog
                Icon={actions.deactivate.status === DEACTIVATE ? X : ArchiveRestore}
                text={actions.deactivate.status === DEACTIVATE ? DEACTIVATE : RESTORE}
                data={getPayload({ type: actions.deactivate.status, url: actions.url ?? '', name: actions.name ?? ''})}
              />
            </>
          )
        }

        {
          actions.delete && (
            <>
              <AlertDialog
                Icon={Trash}
                text={DELETE}
                data={getPayload({ type: DELETE, url: actions?.url ?? '', name: actions?.name ?? ''})}
              />
            </>
          )
        }
        
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
