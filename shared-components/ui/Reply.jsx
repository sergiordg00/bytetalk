import { useSession } from "next-auth/react";

/* Background color and onClick should be given to an outter container, this is only for the UI */
export default function Reply({ data }) {
  const session = useSession();
  const isOwn = session?.data?.user?.email === data?.sender?.email;
  
  return (
    <div className="flex w-full gap-x-2 overflow-hidden rounded-lg">
      <div className="w-1 shrink-0 bg-sky-500"/>

      <div className="w-full py-2">
        <p className="w-full text-sm font-semibold text-sky-500">
          {
            isOwn ?
              "You" 
              :
              data.sender.name
          }
        </p>

        <p className="w-full text-sm text-gray-500">
          {
            data.image ?
              "📷 Image"
              :
              data.body
          }
        </p>
      </div>
    </div>
  );
}