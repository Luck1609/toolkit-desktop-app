import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { TypographySm, TypographyXs } from './typography'
import { cn } from '@/lib/utils'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '../ui/dropdown-menu'
import { CircleUser, LogOut } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function UserButton({ className, showRole = true, avatarClassName }: {className?: string, showRole?: boolean, avatarClassName?: string}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full">
        <div className={cn("w-full flex space-x-4 items-center rounded-none text-color bg-white hover:bg-dark-text  dark:text-dark-text dark:bg-transparent dark:border dark:border-dark-border hover:dark:bg-dark-border", className)}>
          <Avatar className={cn(avatarClassName)}>
            <AvatarImage src="" alt="" />
            <AvatarFallback className="text-sm">NL</AvatarFallback>
          </Avatar>
          <div className="text-left">
            <TypographySm className="block font-semibold">Nathan Luck</TypographySm>
            
            {
              showRole && <TypographyXs>Web developer</TypographyXs>
            }
          </div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link to="/" className="flex space-x-2 items-center">
            <CircleUser />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/" className="flex space-x-2 items-center">
            <LogOut size={18} />
            <span>Logout</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
