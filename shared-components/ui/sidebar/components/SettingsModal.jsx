"use client";

import axios from "axios";
import clsx from "clsx";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import { useRef,useState } from "react";
import { toast } from "react-hot-toast";
import { IoMdAddCircle } from "react-icons/io";

import placeholderAvatar from "@/assets/img/placeholder.jpg";
import Button from "@/shared-components/buttons/Button";
import Input from "@/shared-components/inputs/Input";
import AppModal from "@/shared-components/modals/AppModal";

export default function SettingsModal({ isOpen, onClose, currentUser }) {
  const [formState, setFormState] = useState({
    name: currentUser?.name,
    image: currentUser?.image
  });
  const [formLoading, setFormLoading] = useState(false);
  const uploadButton = useRef(null);

  function handleUpload(result) {
    setFormState({
      ...formState,
      image: result?.info?.secure_url
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    setFormLoading(true);

    axios.post("/api/settings", formState)
      .then(() => {
        toast.success("Settings saved");
        onClose();
      })
      .catch(() => {
        toast.error("Error saving settings");
      })
      .finally(() => setFormLoading(false));
  }

  return (
    <AppModal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={onSubmit}>
        <div className="space-y-5">
          <div className="border-b border-solid border-gray-900/10 pb-8">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>

            <p className="mt-1 text-sm leading-6 text-gray-600">
              Edit your public information.
            </p>

            <div className="mt-5 flex flex-col gap-y-8">
              <Input
                disabled={formLoading}
                label="Name"
                value={formState.name}
                onChange={(e) => setFormState({
                  ...formState,
                  name: e.target.value
                })}
                required
              />

              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Photo
                </label>

                <div className="mt-2 flex items-center gap-x-3">
                  <div 
                    className={clsx(
                      "relative h-[48px] w-[48px]",
                      !formState.image && "cursor-pointer"
                    )}
                    onClick={!formState.image ? () => uploadButton.current.click() : null}
                  >
                    <Image
                      width="48"
                      height="48"
                      className="h-full w-full rounded-full border-[1px] border-solid border-gray-200 object-cover"
                      src={formState.image || placeholderAvatar}
                      alt="User Avatar"
                    />

                    {!formState.image && (
                      <IoMdAddCircle className="absolute -right-1 -top-1 h-5 w-5 text-sky-500"/>
                    )}
                  </div>

                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onUpload={handleUpload}
                    uploadPreset="ccii6bws"
                  >
                    <Button
                      disabled={formLoading}
                      reference={uploadButton}
                      secondary
                    >
                      Change
                    </Button>
                  </CldUploadButton>

                  {formState.image && (
                    <Button
                      disabled={formLoading}
                      onClick={() => setFormState({
                        ...formState,
                        image: null
                      })}
                      danger
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-0 flex items-center justify-end gap-x-6">
            <Button
              disabled={formLoading}
              onClick={onClose}
              secondary
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={formLoading}
              includeLoader={formLoading}
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </AppModal>
  );
}