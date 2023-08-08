import clsx from "clsx";
import { useSession } from "next-auth/react";

import { useTheme } from "@/context/ThemeContext";

/* Background color and onClick should be given to an outter container, this is only for the UI */
export default function Reply({ data, isInMessageBox=false, isInMyMessageBox }) {
  const { theme } = useTheme();
  const session = useSession();
  const isOwn = session?.data?.user?.email === data?.sender?.email;
  
  return (
    <div className="flex w-full gap-x-2 overflow-hidden rounded-lg">
      <div className={clsx(
        "w-1 shrink-0",
        isInMessageBox ? "bg-replyborder" : "bg-accentprimary"
      )}/>

      <div className="w-full py-2 pr-2">
        <p className={clsx(
          "w-full text-sm font-semibold",
          isInMessageBox ? "text-replyborder" : "text-accentprimary"
        )}>
          {
            isOwn ?
              "You" 
              :
              data.sender.name
          }
        </p>

        <p className={clsx(
          "line-clamp-2 w-full text-sm",
          isInMessageBox && isInMyMessageBox && theme === "dark" ?  
            "text-black"
            : 
            "text-textsecondary"
        )}>
          {
            data.image ?
              "📷 Image"
              :
              data.body
          }
        </p>
      </div>
    </div>
  );
}