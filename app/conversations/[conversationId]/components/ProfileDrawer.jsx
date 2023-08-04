"use client";

import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { format } from "date-fns";
import { Fragment, useMemo, useState } from "react";
import { IoClose, IoTrash } from "react-icons/io5";

import { useIsActive } from "@/context/ActiveUsersContext";
import useOtherUser from "@/hooks/useOtherUser";
import Avatar from "@/shared-components/ui/Avatar";
import AvatarGroup from "@/shared-components/ui/AvatarGroup";

import ConfirmModal from "./ConfirmModal";

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
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-end">
                          <div className="ml-3 flex h-7 items-center">
                            <button 
                              type="button" 
                              className={clsx(
                                "rounded-md bg-white text-gray-400 hover:text-gray-500",
                                "focus:outline-none"
                              )}
                              autoFocus={false}
                            >
                              <span className="sr-only">
                                Close panel
                              </span>

                              <IoClose size={24} onClick={onClose}/>
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
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
                            <div onClick={() => setIsDeleteModalOpen(true)} className="flex cursor-pointer flex-col items-center gap-3 hover:opacity-75">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100">
                                <IoTrash size={20}/>
                              </div>

                              <p className="text-sm text-neutral-600">
                                Delete
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="w-full py-5 sm:px-0 sm:pt-0">
                          <div className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                            {data.isGroup && (
                              <div>
                                <h3 className="text-sm font-medium text-gray-500 sm:w-40 sm:shrink-0">
                                  Emails
                                </h3>

                                <div className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                  {data.users.map((user) => user.email).join(", ")}
                                </div>
                              </div>
                            )}

                            {!data.isGroup && (
                              <div>
                                <h3 className="text-sm font-medium text-gray-500 sm:w-40 sm:shrink-0">
                                  Email
                                </h3>

                                <div className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                  {otherUser?.email}
                                </div>
                              </div>
                            )}

                            {!data.isGroup && (
                              <>
                                <hr />
                                <div className="">
                                  <h3 className="text-sm font-medium text-gray-500 sm:w-40 sm:shrink-0">
                                    Joined
                                  </h3>

                                  <div className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                    <time dateTime={joinedDate}>
                                      {joinedDate}
                                    </time>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
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