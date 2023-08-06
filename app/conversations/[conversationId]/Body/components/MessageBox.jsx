"use client";

import clsx from "clsx";
import format from "date-fns/format";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Draggable from "react-draggable";
import { FaReply } from "react-icons/fa";

import { useReply } from "@/context/ReplyContext";
import Avatar from "@/shared-components/ui/Avatar";
import Reply from "@/shared-components/ui/Reply";

import ImageModal from "./ImageModal";

export default function MessageBox({ data, isLast }) {
  const { setReply } = useReply();
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const session = useSession();
  const isOwn = session?.data?.user?.email === data?.sender?.email;
  const seenList = (data.seen || []).filter((user) => user.email !== data?.sender?.email).map((user) => user.name).join(", ");

  /** Some CSS classes */
  const container = clsx(
    "flex w-full gap-3 p-4",
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
    "w-fit overflow-hidden px-3 py-2 text-sm",
    isOwn ? "bg-sky-500 text-white" : "bg-gray-100",
    data.image ? "rounded-md" : "rounded-lg"
  );

  return (
    <Draggable
      axis="x"
      position={{ x: 0, y: 0 }}
      bounds={{ left: 0, right: 150 }}
      onStart={() => setIsDragging(true)}
      onStop={(e, positionData) => {
        setIsDragging(false);

        if (positionData.x >= 150) {
          setReply(data);
        }
      }}
    >
      <div className={clsx(
        "relative flex w-full cursor-move items-center",
        !isDragging && "transition"
      )}>
        <div className={container} id={data.id}>
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
              {data.reply && (
                <div 
                  className={clsx(
                    "mb-2 w-full cursor-pointer rounded-lg transition",
                    isOwn ? "bg-sky-300 hover:bg-sky-400" : "bg-gray-300 hover:bg-gray-400"
                  )}
                  onClick={() => document.getElementById(data.reply.id).scrollIntoView({ behavior: "smooth" })}
                >
                  <Reply data={data.reply} isInMessageBox/>
                </div>
              )}

              {
                data.image ?
                  <Image
                    alt="Message image"
                    height="288"
                    width="288"
                    src={data.image}
                    className="cursor-pointer object-cover transition hover:scale-110"
                    onClick={() => setIsImageModalOpen(true)}
                    draggable={false}
                  />
                  :
                  <p>
                    {data.body}
                  </p>
              }
            </div>

            {isLast && isOwn && seenList.length > 0 && (
              <div className="text-xs font-light text-gray-500">
                Seen by {seenList}
              </div>
            )}
          </div>
        </div>

        <FaReply size={24} className="absolute left-[-50px] text-gray-900"/>
      </div>
    </Draggable>
  );
}