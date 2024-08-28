import React from "react";
import Icons from "pages/inc/icons";
import { Btn } from "components/btn";

export default function NotificationComponent() {
  return (
    <ul className="absolute w-96 bg-white -right-40 top-12 shadow-custom z-30 border rounded-md divide-y">
      <li className="p-2 flex items-center">
        <div className="w-[70px]">
          <div className="w-[50px] h-[50px] bg-rose-400 rounded-full flex">
            <Icons.Unlock className="m-auto text-white" />
          </div>
        </div>
        <p className="w-full text-sm ml-3">
          Nathaniel Obeng has requested for a password reset
        </p>

        <Btn
          content={
            <span className="flex items-center text-white m-auto">
              <Icons.Unlock size={18} className="" />
            </span>
          }
          className="bg-slate-400 hover:bg-slate-500 btn p-0 flex h-8 rounded-md w-10"
        />
      </li>
      <li className="p-2 flex items-center">
        <div className="w-[70px]">
          <div className="w-[50px] h-[50px] bg-teal-400 rounded-full flex">
            <Icons.Schedule className="m-auto text-white" />
          </div>
        </div>
        <p className="w-full text-sm ml-3">
          A meeting has been scheduled to take place
        </p>

        <Btn
          content={
            <span className="flex items-center text-white m-auto text-xs">
              OK
            </span>
          }
          className="bg-slate-400 hover:bg-slate-500 btn p-0 flex h-8 rounded-md w-10"
        />
      </li>
    </ul>
  );
}
