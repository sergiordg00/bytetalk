"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { RotatingLines } from "react-loader-spinner";

import Avatar from "@/shared-components/ui/Avatar";

export default function UserBox({ data: user }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  function onClick() {
    setIsLoading(true);

    axios.post("/api/conversations", {
      userId: user.id
    })
      .then(({ data }) => {
        router.push(`/conversations/${data.id}`);
        toast.success(`Conversation created with ${user.name}`);
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <div className="relative flex w-full cursor-pointer items-center space-x-3 rounded-lg bg-white p-3 transition hover:bg-neutral-100" onClick={onClick}>
      <Avatar user={user}/>

      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="mb-1 flex items-center justify-between gap-x-2">
            <p className="text-sm font-medium text-gray-900">
              {user.name}
            </p>

            {isLoading && (
              <RotatingLines
                strokeColor="gray"
                width={20}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}