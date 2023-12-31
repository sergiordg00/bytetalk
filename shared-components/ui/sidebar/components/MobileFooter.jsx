"use client";

import clsx from "clsx";
import Link from "next/link";

import useConversation from "@/hooks/useConversation";
import useRoutes from "@/hooks/useRoutes";

function MobileItem({ href, icon: Icon, active, onClick }) {
  return (
    <Link 
      href={href}
      className={clsx(
        "flex w-full justify-center gap-x-3 p-4 text-textsecondary",
        "hover:bg-hoverprimary hover:text-textprimary",
        active && "bg-hoverprimary text-textprimary"
      )}
      onClick={onClick}
    >
      <Icon className="h-6 w-6 shrink-0"/>
    </Link>
  );
}

export default function MobileFooter() {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  if (isOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-0 z-40 flex w-full items-center justify-between border-t-[1px] border-solid border-t-borderprimary bg-bgtertiary lg:hidden">
      {routes.map((item) => (
        <MobileItem
          key={item.label}
          href={item.href}
          icon={item.icon}
          active={item.active}
          onClick={item.onClick}
        />
      ))}
    </div>
  );
}