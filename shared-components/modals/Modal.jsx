"use client";

import clsx from "clsx";
import { useEffect, useRef,useState } from "react";
import { createPortal } from "react-dom";

import DelayUnmount from "@/shared-components/common/DelayUnmount";

import "./styles/Modal.css";

export default function Modal({ isOpen, onClose, className, backdropClose=true, children }) {
  /* This flag is only when the component is used inside Next.js, because the index.html file is generated at build time, and the portal div is not available at that time. */
  const [nextjsFlag, setNextjsFlag] = useState(false);
  const clickInitiator = useRef(null);

  useEffect(() => {
    setNextjsFlag(true);
  }, []);

  useEffect(() => {
    if(isOpen) {
      document.body.classList.add("overflow-hidden");
    } 
  }, [isOpen]);

  useEffect(() => {
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  function handleBackdropClick() {
    if(clickInitiator.current === "backdrop" && backdropClose) {
      onClose();
    }
  }

  return (
    nextjsFlag ? 
      createPortal(
        <DelayUnmount 
          shouldUnmount={!isOpen} 
          delay={300}
          onUnmount={() => {
            document.body.classList.remove("overflow-hidden");
          }}
        >
          <div className="fixed left-0 top-0 z-[51] h-screen w-full overflow-y-auto">
            <div 
              onClick={handleBackdropClick} 
              onMouseDown={() => clickInitiator.current = "backdrop"}
              className={clsx(
                "flex min-h-full w-full items-center justify-center p-4",
                isOpen ? "modal-backdrop-enter" : "modal-backdrop-exit"
              )}
            >
              <div 
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => { e.stopPropagation(); clickInitiator.current = "modal"; }}
                className={clsx(
                  "relative shadow-xl",
                  isOpen ? "modal-enter" : "modal-exit",
                  className
                )}
              >
                {children}
              </div>
            </div>
          </div>
        </DelayUnmount>
        , document.getElementById("portal")
      ) : null
  );
}