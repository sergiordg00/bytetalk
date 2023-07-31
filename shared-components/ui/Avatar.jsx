"use client";

import clsx from "clsx";
import Image from "next/image";

import placeholderAvatar from "@/assets/img/placeholder.jpg";

export default function Avatar({ user }) {
  return (
    <div className="relative">
      <div className="relative inline-block aspect-square w-9 overflow-hidden rounded-full border-[1px] border-solid border-gray-200 md:w-11">
        <Image 
          alt="User Avatar"
          src={user?.image || placeholderAvatar}
          fill
        />
      </div>

      <span className={clsx(
        "absolute right-0 top-0 block h-2 w-2 rounded-full bg-green-500 ring-2 ring-white",
        "md:h-3 md:w-3"
      )}/>
    </div>
  );
}