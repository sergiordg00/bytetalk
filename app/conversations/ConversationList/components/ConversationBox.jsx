"use client";

import clsx from "clsx";
import format from "date-fns/format";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

import useOtherUser from "@/hooks/useOtherUser";
import Avatar from "@/shared-components/ui/Avatar";
import AvatarGroup from "@/shared-components/ui/AvatarGroup";
import SkeletonConversation from "@/shared-components/ui/SkeletonConversation";

export default function ConversationBox({ data, selected }) {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();
  const userEmail = session?.data?.user?.email;

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];

    return messages[messages.length - 1];
  }, [data.messages]);

  const hasSeen = useMemo(() => {
    if(!lastMessage || !userEmail) {
      return false;
    }

    const seenArray = lastMessage.seen || [];

    return seenArray.some((user) => user.email === userEmail);
  }, [lastMessage, userEmail]);

  const lastMessageText = useMemo(() => {
    if(lastMessage?.image) {
      return "Sent an image";
    }

    if(lastMessage?.body) {
      return lastMessage.body;
    }

    return "Started a conversation";
  }, [lastMessage]);

  function onClick() {
    router.push(`/conversations/${data.id}`);
  }

  if(!otherUser) {
    return <SkeletonConversation/>;
  }
  
  return (
    <div onClick={onClick} className={clsx(
      "relative flex w-full cursor-pointer items-center space-x-3 rounded-lg p-3 transition hover:bg-neutral-100",
      selected ? "bg-neutral-100" : "bg-white"
    )}>
      {
        data.isGroup ?
          <AvatarGroup users={data.users}/>
          :
          <Avatar user={otherUser}/>
      }

      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="mb-1 flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-900">
              {data.name || otherUser?.name}
            </p>

            {lastMessage?.createdAt && (
              <p className="text-xs font-light text-gray-400">
                {format(new Date(lastMessage.createdAt), "p")}
              </p>
            )}
          </div>

          <p className={clsx(
            "truncate text-sm",
            hasSeen ? "text-gray-500" : "font-medium text-black"
          )}>
            {lastMessageText}
          </p>
        </div>
      </div>

    </div>
  );
}