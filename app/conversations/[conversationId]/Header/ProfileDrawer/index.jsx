"use client";

import { Dialog, Transition } from "@headlessui/react";
import { format } from "date-fns";
import { Fragment, useMemo, useState } from "react";

import { useIsActive } from "@/context/ActiveUsersContext";
import useOtherUser from "@/hooks/useOtherUser";

import AvatarAndDelete from "./components/AvatarAndDelete";
import Body from "./components/Body";
import ConfirmModal from "./components/ConfirmModal";
import Header from "./components/Header";

export default function ProfileDrawer({ isOpen, onClose, data }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const otherUser = useOtherUser(data);
  const isActive = useIsActive(otherUser?.email);

  const joinedDate = useMemo(() => {
    return otherUser ? format(new Date(otherUser.createdAt), "PP") : "";
  }, [otherUser?.createdAt]);

  const title = useMemo(() => {
    return data.name || otherUser?.name;
  }, [data.name, otherUser?.name]);

  const statusText = useMemo(() => {
    if(data.isGroup) {
      return `${data.users.length} members`;
    }

    if(isActive) {
      return "Active";
    }

    return "Offline";
  }, [data, isActive]);

  return (
    <>
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />

      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog 
          as="div"
          className="relative z-50"
          onClose={onClose}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {/* eslint-disable-next-line tailwindcss/migration-from-tailwind-2 */}
            <div className="fixed inset-0 bg-black bg-opacity-40"/>
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-auto bg-white py-6 shadow-xl">
                      <Header onClose={onClose}/>

                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <AvatarAndDelete
                          data={data}
                          otherUser={otherUser}
                          title={title}
                          statusText={statusText}
                          openDeleteModal={() => setIsDeleteModalOpen(true)}
                        />

                        <Body
                          data={data}
                          otherUser={otherUser}
                          joinedDate={joinedDate}
                        />
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}