import SideNav from "./sidenav";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Outlet } from "react-router-dom";
import { Bell, Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { ScrollArea } from "@/components/ui/scroll-area";
import Breadcrumb from "@/components/custom/breadcrumb";
import Container from "@/components/custom/container";

export default function AuthLayout() {
  const { setTheme, theme } = useTheme();

  const toggleTheme = (theme: "light" | "dark") => () => setTheme(theme);

  return (
    <div className="min-h-screen h-full bg-gray-100 dark:bg-dark grid lg:grid-cols-12">
      <div className="lg:col-span-2">
        <SideNav />
      </div>
      <div className="lg:col-span-10">
        <nav className="bg-white dark:bg-default border-b border-gray-100 dark:border-input ">
          <div className="">
            <div className="flex justify-between items-center h-16 px-5">
              <div className="flex">
                <span>Dashboard</span>
              </div>

              <ul className="hidden sm:flex sm:items-center space-x-3">
                <li>
                  <Button className="bg-transparent dark:hover:bg-input dark:text-white">
                    <Bell height={18} />
                  </Button>
                </li>
                <li className="relative">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="btn-secondary-outline">
                        Nathan Luck
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-56">
                      <DropdownMenuItem>
                        {/* <CreditCard className="mr-2 h-4 w-4" /> */}
                        <span>Billing</span>
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
                <li>
                  {theme === "light" ? (
                    <Button
                      className="bg-transparent hover:bg-input"
                      onClick={toggleTheme("dark")}
                    >
                      <Moon />
                    </Button>
                  ) : (
                    <Button
                      className="bg-transparent hover:bg-input"
                      onClick={toggleTheme("light")}
                    >
                      <Sun />
                    </Button>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Container className="bg-transparent">
          <Breadcrumb />
        </Container>
        
        <main>
          <ScrollArea className="h-[90vh] mt-10">
            <Outlet />
          </ScrollArea>
        </main>
      </div>
    </div>
  );
}
