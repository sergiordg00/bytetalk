import { useEffect, useState } from "react";
import { useRef } from "react";
import { IoClose } from "react-icons/io5";

import { useReply } from "@/context/ReplyContext";
import DelayUnmount from "@/shared-components/common/DelayUnmount";
import Reply from "@/shared-components/ui/Reply";

export default function ReplyPreview() {
  const { reply, setReply } = useReply();
  const [shouldMount, setShouldMount] = useState(Boolean(reply));
  const [applyEnterAnimation, setApplyEnterAnimation] = useState(false);
  const replyContainer = useRef(null);
  const replyContent = useRef(null);

  useEffect(() => {
    if (reply) {
      setShouldMount(true);
    } else if(shouldMount) {
      setShouldMount(false);
    }
  }, [reply]);

  useEffect(() => {
    if (shouldMount) {
      setApplyEnterAnimation(true);
    } else {
      setApplyEnterAnimation(false);
    }
  }, [shouldMount]);

  useEffect(() => {
    if(replyContainer.current) {
      if (applyEnterAnimation) {
        replyContainer.current.style.height = `${replyContent.current.offsetHeight}px`;
      } else {
        replyContainer.current.style.height = "";
      }
    }
  }, [applyEnterAnimation, reply]);

  return (
    <DelayUnmount 
      delay={300} 
      shouldUnmount={!shouldMount}
      onUnmount={() => setReply(null)}
    >
      <div className="h-0 w-full overflow-hidden transition-all duration-300" ref={replyContainer}>
        <div className="relative w-full" ref={replyContent}>
          <Reply data={reply}/>

          <button type="button" className="absolute right-0 top-0 p-1 text-gray-400 hover:text-gray-500">
            <span className="sr-only">
              Close
            </span>

            <IoClose size={20} onClick={() => setShouldMount(false)}/>
          </button>
        </div>
      </div>
    </DelayUnmount>
  );
}