"use client";

import clsx from "clsx";
import Image from "next/image";
import { useRef } from "react";

import placeholderAvatar from "@/assets/img/placeholder.jpg";

export default function AvatarGroup({ users=[] }) {
  const slicedUsers = users.slice(0, 3);
  const avatarPositions = useRef({
    0: slicedUsers.length === 2 ? "w-[28px] h-[28px] left-0" : "top-0 w-[21px] h-[21px]",
    1: slicedUsers.length === 2 ? "w-[28px] h-[28px] right-0" : "bottom-0 left-0 w-[21px] h-[21px]",
    2: "w-[21px] h-[21px] right-0 bottom-0"
  });

  return (
    <div className="relative flex h-11 w-11 items-center justify-center">
      {slicedUsers.map((user, index) => (
        <div 
          key={user.id}
          className={clsx(
            "absolute overflow-hidden rounded-full border border-solid border-gray-200",
            avatarPositions.current[index]
          )}
        >
          <Image
            alt="User Avatar"
            className="object-cover"
            src={user.image || placeholderAvatar}
            fill
          />
        </div>
      ))}
    </div>
  );
}