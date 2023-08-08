"use client";

import clsx from "clsx";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";

import useRoutes from "@/hooks/useRoutes";
import Avatar from "@/shared-components/ui/Avatar";

import SettingsModal from "./SettingsModal";
import SwitchTheme from "./SwitchTheme";

function DesktopItem({ href, label, icon: Icon, active, onClick }) {
  return (
    <li onClick={onClick}>
      <Link 
        href={href} 
        className={clsx(
          "group flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-6 text-textsecondary",
          "hover:textprimary hover:bg-hoverprimary",
          active && "textprimary bg-hoverprimary"
        )}
      >
        <Icon className="h-6 w-6 shrink-0"/>

        <span className="sr-only">
          {label}
        </span>
      </Link>
    </li>
  );
}

export default function DesktopSidebar({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const routes = useRoutes();
  const session = useSession();

  return (
    <>
      <SettingsModal
        currentUser={session?.data?.user || user}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />

      <div className="fixed inset-y-0 left-0 z-40 hidden w-20 flex-col justify-between overflow-y-auto border-r-[1px] border-solid border-r-borderprimary bg-bgtertiary px-3 py-4 lg:flex">
        <nav className="flex flex-col justify-between">
          <ul role="list" className="flex flex-col items-center gap-y-1">
            {routes.map((item) => (
              <DesktopItem
                key={item.label}
                href={item.href}
                label={item.label}
                icon={item.icon}
                active={item.active}
                onClick={item.onClick}
              />
            ))}
          </ul>
        </nav>

        <nav className="mt-4 flex flex-col items-center justify-between gap-y-4">
          <SwitchTheme />

          <div onClick={() => setIsOpen(true)} className="cursor-pointer hover:opacity-75">
            <Avatar user={session?.data?.user || user}/>
          </div>
        </nav>
      </div>
    </>
  );
}