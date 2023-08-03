"use client";

import axios from "axios";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { FiAlertTriangle } from "react-icons/fi";

import useConversation from "@/hooks/useConversation";
import Button from "@/shared-components/buttons/Button";
import AppModal from "@/shared-components/modals/AppModal";

export default function ConfirmModal({ isOpen, onClose }) {
  const router = useRouter();
  const { conversationId } = useConversation();
  const [isLoading, setIsLoading] = useState(false);

  function onDelete() {
    setIsLoading(true);
    axios.delete(`/api/conversations/${conversationId}`)
      .then(() => {
        toast.success("Conversation deleted");
        router.push("/conversations");
        router.refresh();
      })
      .catch(() => {
        setIsLoading(false);
        toast.error("Failed to delete conversation");
      });
  }

  return (
    <AppModal isOpen={isOpen} onClose={onClose}>
      <div className="sm:flex sm:items-start">
        <div className={clsx(
          "mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100",
          "sm:mx-0 sm:h-10 sm:w-10"
        )}>
          <FiAlertTriangle className="h-6 w-6 text-red-600"/>
        </div>

        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Delete conversation
          </h3>

          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this conversation?
              All of your messages will be permanently removed. 
              This action cannot be undone.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 flex justify-center sm:mt-4 sm:justify-end">
        <Button
          disabled={isLoading}
          onClick={onClose}
          secondary
        >
          Cancel
        </Button>
        
        <Button
          disabled={isLoading}
          onClick={onDelete}
          includeLoader={isLoading}
          danger
        >
          Delete
        </Button>
      </div>
    </AppModal>
  );
}