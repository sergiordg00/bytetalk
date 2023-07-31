"use client";

import clsx from "clsx";

import UserBox from "./UserBox";

export default function UsersList({ users }) {
  return (
    <aside className={clsx(
      "fixed inset-y-0 left-0 block w-full overflow-y-auto border-r border-gray-200 pb-20",
      "lg:left-20 lg:w-80 lg:pb-0"
    )}>
      <div className="px-5">
        <div className="flex-col">
          <h2 className="py-4 text-xl font-bold text-neutral-800">
            People
          </h2>
        </div>

        {users.map((user) => (
          <UserBox key={user.id} data={user}/>
        ))}
      </div>
    </aside>
  );
}