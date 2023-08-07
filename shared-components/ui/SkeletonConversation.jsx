import clsx from "clsx";
import Image from "next/image";

import placeholderAvatar from "@/assets/img/placeholder.jpg";

export default function SkeletonConversation({ headerVariation=false }) {
  return (
    <div className={clsx(
      "flex w-full items-center gap-x-2 rounded-lg",
      !headerVariation && "p-3 hover:bg-hoverprimary/40"
    )}>
      <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border-[1px] border-solid border-borderprimary md:h-11 md:w-11">
        <Image 
          alt="Placeholder Avatar"
          src={placeholderAvatar}
          fill
        />
      </div>

      <div className="flex w-full flex-col gap-y-2">
        <div className="h-3 w-[60%] max-w-[200px] rounded-sm bg-hoverprimary"/>
        <div className="h-[10px] w-[80%] max-w-[250px] rounded-sm bg-hoverprimary"/>
      </div>
    </div>
  );
}