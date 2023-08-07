"use client";

import clsx from "clsx";

export default function Input({ label, errors=[], ...inputProps }) {
  return ( 
    <div className="w-full">
      <label className="block text-sm font-medium leading-6 text-textsecondary" htmlFor={inputProps.id}>
        {label}
      </label>
      
      <input 
        className={clsx(
          "ring-bordersecondary form-input mt-2 block w-full rounded-md border-0 bg-accentsecondary py-1.5 text-sm leading-6 text-textprimary shadow-sm ring-1 ring-inset placeholder:text-textsecondary",
          "focus:ring-2 focus:ring-inset focus:ring-accentprimary",
          errors[inputProps.id] && "focus:ring-rose-500",
          inputProps.disabled && "cursor-default opacity-50"
        )} 
        {...inputProps}
      />
    </div>
  );
}