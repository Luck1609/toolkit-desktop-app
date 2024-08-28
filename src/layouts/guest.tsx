// import { ReactNode } from "react";
import me from "@/assets/img/me.png";
import office from "@/assets/img/office-block.png";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Outlet, useLocation } from "react-router-dom";


export default function Guest() {
  const {pathname} = useLocation();
// export default function Guest({ children, className }: {children: ReactNode, className: string}) {
  return (
    <ScrollArea>
      <div className="w-full flex flex-col items-center justify-center h-screen pb-8">
        {
          pathname === "/office" ? (
            <div>
              <img src={office} alt="" className="h-32" />
            </div>
          ) : (
            <div>
              <img src={me} alt="" className="h-32" />
            </div>
          )
        }
      
        <Outlet />
      </div>
    </ScrollArea>
  );
}
