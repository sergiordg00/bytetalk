"use client";

import { RotatingLines } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-bgprimary lg:pl-80">
      <RotatingLines
        strokeColor="gray"
        width={30}
      />
    </div>
  );
}