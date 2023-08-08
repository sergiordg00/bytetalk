"use client";
import clsx from "clsx";
import format from "date-fns/format";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import { FaReply } from "react-icons/fa";
import { GiBrain } from "react-icons/gi";
import { RotatingLines } from "react-loader-spinner";

import { useReply } from "@/context/ReplyContext";
import { useTheme } from "@/context/ThemeContext";
import Avatar from "@/shared-components/ui/Avatar";
import Reply from "@/shared-components/ui/Reply";

import GPTAdvisor from "./GPTAdvisor";
import ImageModal from "./ImageModal";

export default function MessageBox({ data, isLast }) {
  const { theme } = useTheme();
  const { setReply } = useReply();
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [messageToAdvise, setMessageToAdvise] = useState(false);
  const session = useSession();
  const isOwn = session?.data?.user?.email === data?.sender?.email;
  const seenList = (data.seen || []).filter((user) => user.email !== data?.sender?.email).map((user) => user.name).join(", ");
  const parsedReply = useMemo(() => {
    try {
      return JSON.parse(data.reply);
    } catch (e) {
      return data.reply;
    }
  }, [data.reply]);

  /** Some CSS classes */
  const container = clsx(
    "group flex w-full gap-3 p-4",
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
    isOwn ? "bg-accentprimary text-white" : "bg-accentsecondary text-textprimary",
    data.image ? "rounded-md" : "rounded-lg"
  );

  return (
    <>
      <GPTAdvisor 
        data={messageToAdvise} 
        onClose={() => setMessageToAdvise(null)}
      />
    
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
            <div className="text-sm text-textsecondary">
              {
                isOwn ?
                  session.data.user.name
                  :
                  data.sender.name
              }
            </div>

            <div className="text-xs text-textmuted">
              {format(new Date(data.createdAt), "p")}
            </div>
          </div>

          <div className="flex w-fit items-center gap-x-2">
            <div className={clsx(
              "flex items-center gap-x-1",
              !isOwn && "order-2"
            )}>
              {
                data.loading ?
                  <RotatingLines
                    strokeColor="gray"
                    width={22}
                  />
                  :
                  <>
                    <div 
                      className="cursor-pointer rounded-full p-2 opacity-0 transition hover:bg-hoversecondary group-hover:opacity-100"
                      onClick={() => setReply(data)}
                    >
                      <FaReply size={18} className="text-textprimary"/> 
                    </div>
            
                    {!data.image && !isOwn && (
                      <div 
                        className="cursor-pointer rounded-full p-2 opacity-0 transition hover:bg-hoversecondary group-hover:opacity-100"
                        onClick={() => setMessageToAdvise(data)}
                      >
                        <GiBrain size={24} className="text-textprimary"/> 
                      </div>
                    )}
                  </>
              }
            </div>
          
            <div className={message}>
              {data.reply && (
                <div 
                  className={clsx(
                    "mb-2 w-full cursor-pointer rounded-lg",
                    isOwn ? 
                      theme === "light" ? "bg-sky-300 hover:bg-sky-400" : "bg-fuchsia-300 hover:bg-fuchsia-400"
                      :
                      theme === "light" ? "bg-gray-300 hover:bg-gray-400" : "bg-stone-800 hover:bg-stone-700" 
                  )}
                  onClick={() => document.getElementById(parsedReply.id).scrollIntoView({ behavior: "smooth" })}
                >
                  <Reply data={parsedReply} isInMessageBox isInMyMessageBox={isOwn}/>
                </div>
              )}

              {
                data.image ?
                  <div className="h-[250px] w-[250px] overflow-hidden">
                    <Image
                      alt="Message image"
                      height="250"
                      width="250"
                      src={data.image}
                      className="cursor-pointer object-cover transition hover:scale-110"
                      onClick={() => setIsImageModalOpen(true)}
                      draggable={false}
                    />
                  </div>
                  :
                  <p>
                    {data.body}
                  </p>
              }
            </div>
          </div>

          {isLast && isOwn && seenList.length > 0 && (
            <div className="text-xs font-light text-textsecondary">
                Seen by {seenList}
            </div>
          )}
        </div>
      </div>
    </>
  );
}