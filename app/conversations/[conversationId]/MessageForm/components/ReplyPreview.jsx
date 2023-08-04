import { useEffect, useState } from "react";
import { useRef } from "react";

import { useReply } from "@/context/ReplyContext";
import DelayUnmount from "@/shared-components/common/DelayUnmount";

export default function ReplyPreview() {
  const { reply, setReply } = useReply();
  const [shouldMount, setShouldMount] = useState(Boolean(reply));
  const [applyEnterAnimation, setApplyEnterAnimation] = useState(false);
  const replyContainer = useRef(null);
  const replyContent = useRef(null);

  useEffect(() => {
    if (reply) {
      setShouldMount(true);
    }
  }, [reply]);

  useEffect(() => {
    if (shouldMount) {
      setApplyEnterAnimation(true);
    } else {
      setApplyEnterAnimation(false);
    }
  }, [shouldMount]);

  // useEffect(() => {
  //   if (applyEnterAnimation) {
  //     replyContainer.current.style.height = `${replyContent.current.offsetHeight}px`;
  //   } else {
  //     replyContainer.current.style.height = "0px";
  //   }
  // }, [applyEnterAnimation]);

  return (
    <DelayUnmount 
      delay={300} 
      shouldUnmount={!shouldMount}
      onUnmount={() => setReply(null)}
    >
      <div className="h-0 w-full overflow-hidden rounded-lg bg-neutral-300 transition-all" ref={replyContainer}>
        <div className="h-12 w-full p-2" ref={replyContent}>
          <button type="button" className="rounded-md bg-sky-500 p-2" onClick={()=>setShouldMount(false)}>
            Cierra esto papi
          </button>
        </div>
      </div>
    </DelayUnmount>
  );
}