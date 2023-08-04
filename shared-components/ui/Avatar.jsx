"use client";

import clsx from "clsx";
import Image from "next/image";

import placeholderAvatar from "@/assets/img/placeholder.jpg";
import { useIsActive } from "@/context/ActiveUsersContext";

export default function Avatar({ user }) {
  const isActive = useIsActive(user?.email);

  return (
    <div className="relative h-9 w-9 md:h-11 md:w-11">
      <div className="relative inline-block h-9 w-9 overflow-hidden rounded-full border-[1px] border-solid border-gray-200 md:h-11 md:w-11">
        <Image 
          alt="User Avatar"
          src={user?.image || placeholderAvatar}
          className="object-cover"
          draggable={false}
          fill
        />
      </div>

      {isActive && (
        <span className={clsx(
          "absolute right-0 top-0 block h-2 w-2 rounded-full bg-green-500 ring-2 ring-white",
          "md:h-3 md:w-3"
        )}/>
      )}
    </div>
  );
}