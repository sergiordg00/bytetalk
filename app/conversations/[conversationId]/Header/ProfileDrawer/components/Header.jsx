import clsx from "clsx";
import { IoClose } from "react-icons/io5";

export default function Header({ onClose }) {
  return (
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
  );
}