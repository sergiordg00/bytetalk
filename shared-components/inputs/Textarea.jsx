"use client";

import clsx from "clsx";

export default function Textarea({ label, className, ...inputProps }) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium leading-6 text-textsecondary" htmlFor={inputProps.id}>
        {label}
      </label>
      
      <textarea
        className={clsx(
          "form-textarea mt-2 block w-full rounded-md border-0 bg-accentsecondary py-1.5 text-sm leading-6 text-textprimary shadow-sm ring-1 ring-inset ring-bordersecondary placeholder:text-textmuted",
          "focus:ring-2 focus:ring-inset focus:ring-accentprimary",
          inputProps.disabled && "cursor-default opacity-50",
          className
        )} 
        {...inputProps}
      />
    </div>
  );
}