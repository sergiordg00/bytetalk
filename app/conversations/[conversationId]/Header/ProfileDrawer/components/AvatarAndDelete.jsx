import { IoTrash } from "react-icons/io5";

import Avatar from "@/shared-components/ui/Avatar";
import AvatarGroup from "@/shared-components/ui/AvatarGroup";

export default function AvatarAndDelete({ data, otherUser, title, statusText, openDeleteModal }) {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-2">
        {
          data.isGroup ? 
            <AvatarGroup users={data.users}/>
            : 
            <Avatar user={otherUser}/>
        }
      </div>

      <p className="text-md font-medium">
        {title}
      </p>

      <p className="text-sm text-gray-500">
        {statusText}
      </p>

      <div className="my-8 flex gap-10">
        <div onClick={openDeleteModal} className="flex cursor-pointer flex-col items-center gap-3 hover:opacity-75">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100">
            <IoTrash size={20}/>
          </div>

          <p className="text-sm text-neutral-600">
                                Delete
          </p>
        </div>
      </div>
    </div>
  );
}