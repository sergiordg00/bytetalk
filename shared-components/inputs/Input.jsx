"use client";

import clsx from "clsx";

export default function Input({ label, errors=[], ...inputProps }) {
  return ( 
    <div className="w-full">
      <label className="block text-sm font-medium leading-6 text-gray-600" htmlFor={inputProps.id}>
        {label}
      </label>
      
      <input 
        className={clsx(
          "form-input mt-2 block w-full rounded-md border-0 py-1.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400",
          "focus:ring-2 focus:ring-inset focus:ring-sky-600",
          errors[inputProps.id] && "focus:ring-rose-500",
          inputProps.disabled && "cursor-default opacity-50"
        )} 
        {...inputProps}
      />
    </div>
  );
}