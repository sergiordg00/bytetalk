import { useSession } from "next-auth/react";
import { useMemo } from "react";

export default function useOtherUser(conversation) {
  const session = useSession();
  const otherUser = useMemo(() => {
    if(session?.status === "loading") {
      return null;
    }
    
    const currentUserEmail = session?.data?.user?.email;
    const otherUser = conversation.users.filter((user) => user.email !== currentUserEmail)[0];

    return otherUser;
  }, [session?.data?.user?.email, conversation.users]);

  return otherUser;
}