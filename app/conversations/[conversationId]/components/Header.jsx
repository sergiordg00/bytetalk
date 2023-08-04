"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useState } from "react";
import { HiChevronLeft } from "react-icons/hi2";
import { HiEllipsisHorizontal } from "react-icons/hi2";

import { useIsActive } from "@/context/ActiveUsersContext";
import useOtherUser from "@/hooks/useOtherUser";
import Avatar from "@/shared-components/ui/Avatar";
import AvatarGroup from "@/shared-components/ui/AvatarGroup";
import SkeletonConversation from "@/shared-components/ui/SkeletonConversation";

import ProfileDrawer from "./ProfileDrawer";

export default function Header({ conversation }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const otherUser = useOtherUser(conversation);
  const isActive = useIsActive(otherUser?.email);
  const statusText = useMemo(() => {
    if(conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    if(isActive) {
      return "Active";
    }

    return "Offline";
  }, [conversation, isActive]);

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

      <header className="flex w-full items-center justify-between gap-x-2 border-b-[1px] bg-white px-4 py-3 shadow sm:px-4 lg:px-6">
        <div className="flex w-full items-center gap-2 lg:gap-3">
          <Link href="/conversations" className="block text-sky-500 hover:text-sky-600 lg:hidden" replace>
            <HiChevronLeft size={30}/>
          </Link>

          {
            !otherUser ?
              <SkeletonConversation headerVariation/> 
              :
              <>
                {
                  conversation.isGroup ?
                    <AvatarGroup users={conversation.users}/>
                    :
                    <Avatar user={otherUser}/>
                }

                <div className="flex flex-col gap-y-[2px] lg:gap-0">
                  <h2 className="text-sm font-medium text-gray-900">
                    {conversation.name || otherUser.name}
                  </h2>

                  <p className="text-xs text-neutral-400 lg:text-sm">
                    {statusText}
                  </p>
                </div>
              </>
          }
        </div>

        <HiEllipsisHorizontal 
          size={32} 
          className="cursor-pointer rounded-full text-sky-500 transition hover:bg-neutral-200 hover:text-sky-600"
          onClick={() => setIsDrawerOpen(true)}
        />
      </header>
    </>
  );
}