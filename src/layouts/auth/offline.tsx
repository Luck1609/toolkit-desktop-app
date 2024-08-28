import React from "react";
import { Btn } from "components/btn";

export default function Offline() {
  return (
    <div className="h-screen w-screen flex items-center">
      <div className="flex flex-col  m-auto">
        <div className="relative w-36 m-auto">
          <i className="icofont-globe text-9xl text-gray-400" />
          <i className="icofont-ban text-3xl absolute bottom-1 right-1 text-red-500 py-2 px-3 bg-white rounded-full"></i>
        </div>
        <p className="text-xl text-red-400 font-semibold">
          Please connect to the internet to continue
        </p>
        <div className="mt-5 mx-auto">
          <Btn
            // icon="refresh pr-1 text-white"
            content="Refresh"
            className="w-28 h-10 bg-red"
            click={() => window.location.reload()}
          />
        </div>
      </div>
    </div>
  );
}
