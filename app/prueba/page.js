"use client";

import clsx from "clsx";
import { useState } from "react";
import Draggable from "react-draggable";

export default function ComponentName() {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="h-full w-full p-12">
      <div className="mx-auto flex h-full w-96 justify-end overflow-y-auto overflow-x-hidden border border-solid border-gray-500 p-3">
        <Draggable
          axis="x"
          position={{ x: 0, y: 0 }}
          bounds={{ left: -200, right: 0 }}
          onStart={() => setIsDragging(true)}
          onStop={(e, data) => {
            setIsDragging(false);

            if (data.x >= 200) {
              // alert("You win!");
            }
          }}
        >
          <div className={clsx(
            "h-12 w-full max-w-[50px] cursor-move rounded-lg bg-sky-500 shadow",
            !isDragging && "transition"
          )}
          />
        </Draggable>
      </div>
    </div>
  );
}