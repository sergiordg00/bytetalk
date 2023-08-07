import clsx from "clsx";
import { RotatingLines } from "react-loader-spinner";

export default function Button({ type="button", fullWidth, onClick, secondary, danger, disabled, includeLoader=false, reference, children }) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        "flex items-center justify-center gap-x-2 rounded-md px-3 py-2 text-sm font-semibold",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        fullWidth && "w-full",
        disabled && "cursor-default opacity-50",
        secondary ? "text-textprimary hover:text-textsecondary" : "text-white",
        danger && "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-500",
        (!danger && !secondary) && "bg-accentprimary hover:opacity-75"
      )}
      ref={reference}
    >
      {children}
      
      {includeLoader && (
        <RotatingLines
          strokeColor="black"
          width={20}
        />
      )}
    </button>
  );
}