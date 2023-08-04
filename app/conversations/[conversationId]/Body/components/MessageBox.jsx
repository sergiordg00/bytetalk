"use client";

import clsx from "clsx";
import format from "date-fns/format";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState } from "react";

import Avatar from "@/shared-components/ui/Avatar";

import ImageModal from "./ImageModal";

export default function MessageBox({ data, isLast }) {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const session = useSession();
  const isOwn = session?.data?.user?.email === data?.sender?.email;
  const seenList = (data.seen || []).filter((user) => user.email !== data?.sender?.email).map((user) => user.name).join(", ");

  /** Some CSS classes */
  const container = clsx(
    "flex gap-3 p-4",
    isOwn && "justify-end"
  );
  const avatar = clsx(
    isOwn && "order-2"
  );
  const body = clsx(
    "flex flex-col gap-2",
    isOwn && "items-end"
  );
  const message = clsx(
    "w-fit overflow-hidden text-sm",
    isOwn ? "bg-sky-500 text-white" : "bg-gray-100",
    data.image ? "rounded-md p-0" : "rounded-full px-3 py-2"
  );

  return (
    <div className={container}>
      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        src={data.image}
      />
      
      <div className={avatar}>
        <Avatar user={isOwn ? session.data.user : data.sender}/>
      </div>

      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">
            {
              isOwn ?
                session.data.user.name
                :
                data.sender.name
            }
          </div>

          <div className="text-xs text-gray-400">
            {format(new Date(data.createdAt), "p")}
          </div>
        </div>

        <div className={message}>
          {
            data.image ?
              <Image
                alt="Message image"
                height="288"
                width="288"
                src={data.image}
                className="cursor-pointer object-cover transition hover:scale-110"
                onClick={() => setIsImageModalOpen(true)}
              />
              :
              data.body
          }
        </div>

        {isLast && isOwn && seenList.length > 0 && (
          <div className="text-xs font-light text-gray-500">
            Seen by {seenList}
          </div>
        )}
      </div>
    </div>
  );
}