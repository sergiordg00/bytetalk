"use client";

export default function MessageInput(inputProps) {
  return (
    <div className="relative w-full">
      <input 
        type="text" 
        {...inputProps}
        className="w-full bg-transparent pr-4 text-black transition focus:outline-none"
        autoComplete="off"
      />
    </div>
  );
}