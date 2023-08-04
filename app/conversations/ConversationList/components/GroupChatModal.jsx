"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

import Button from "@/shared-components/buttons/Button";
import Input from "@/shared-components/inputs/Input";
import Select from "@/shared-components/inputs/Select";
import AppModal from "@/shared-components/modals/AppModal";

export default function GroupChatModal({ isOpen, onClose, users }) {
  const [formState, setFormState] = useState({
    name: "",
    members: [],
  });
  const [formLoading, setFormLoading] = useState(false);
  const router = useRouter();

  function onSubmit(e) {
    e.preventDefault();
    setFormLoading(true);

    axios.post("/api/conversations", { 
      ...formState, 
      isGroup: true 
    })
      .then(() => {
        toast.success("Group chat created");
        router.refresh();
        onClose();
      })
      .catch(() => toast.error("Error creating group chat"))
      .finally(() => setFormLoading(false));
  }

  return (
    <AppModal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={onSubmit}>
        <div className="space-y-5">
          <div className="border-b border-solid border-gray-900/10 pb-8">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Create a group chat
            </h2>

            <p className="mt-1 text-sm leading-6 text-gray-600">
              Create a group chat and add your friends to it.
            </p>

            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                disabled={formLoading}
                label="Group name"
                placeholder="Enter group name"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                required
              />

              <Select
                disabled={formLoading}
                label="Add members"
                options={
                  users.map((user) => ({
                    label: user.name,
                    value: user.id,
                  }))
                }
                value={formState.members}
                onChange={(value) => setFormState({ ...formState, members: value })}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-3">
          <Button
            disabled={formLoading}
            onClick={onClose}
            secondary
          >
            Cancel
          </Button>

          <Button
            disabled={formLoading}
            includeLoader={formLoading}
            type="submit"
          >
            Create
          </Button>
        </div>
      </form>
    </AppModal>
  );
}