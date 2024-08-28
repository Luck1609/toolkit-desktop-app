import LinkTag from "@/components/custom/link";
import { FileInput, LayoutDashboard, Mailbox, Map, MessageSquareText, Package, ScrollText, Settings, UserRound, Users, UsersRound } from "lucide-react";

// interface IActive {
//   active: boolean
// }

const Links = [
  {
    url: "/dashboard",
    icon: <LayoutDashboard className="mr-3" />,
    name: "Dashboard",
  },
  {
    icon: <FileInput className="mr-3" />,
    name: "Applications",
    url: "/applications",
  },
  {
    url: "/committee-members",
    icon: <UsersRound className="mr-3" />,
    name: "Committee",
    match: "/committee-members",
  },
  {
    url: "/letters",
    icon: <Mailbox className="mr-3" />,
    name: "Letters",
  },
  {
    url: "/localities",
    icon: <Map className="mr-3" />,
    name: "Locality & Sectors",
  },
  {
    url: "/extracts",
    icon: <ScrollText className="mr-3" />,
    name: "Extract",
  },
  {
    url: "/sms",
    icon: <MessageSquareText className="mr-3" />,
    name: "SMS",
  },
  {
    url: "/staff",
    icon: <Users className="mr-3" />,
    name: "Staff",
  },
  {
    url: "/sessions",
    icon: <Package className="mr-3" />,
    name: "Sessions",
  },
  {
    url: "/settings",
    icon: <Settings className="mr-3" />,
    name: "Settings",
  },
];

export default function SideNav() {

  return (
    <div className="h-full flex flex-col bg-white dark:bg-default border-r border-gray-50 dark:border-input">
      <div className="w-full flex items-center justify-center h-44">
        <UserRound size={50} className="" />
      </div>

      <ul className="relative z-20 w-full">
        {Links.map(({ url, name, icon }) => {
          return (
            <li className="" key={url}>
              <LinkTag
                key={name}
                className="w-full block my-1 p-2"
                url={url}
                // active={location.includes(url)}
              >
                <span
                  className={`flex items-center pl-5`}
                >
                  {/* <Icon active={location.includes(url)} />  */}
                  {icon}
                  {name}
                </span>
              </LinkTag>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
