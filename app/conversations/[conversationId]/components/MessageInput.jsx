"use client";

export default function MessageInput(inputProps) {
  return (
    <div className="relative w-full">
      <input 
        type="text" 
        {...inputProps}
        className="w-full rounded-full bg-neutral-100 px-4 py-2 text-black transition focus:outline-none focus:ring-2 focus:ring-sky-400"
        autoComplete="off"
      />
    </div>
  );
}