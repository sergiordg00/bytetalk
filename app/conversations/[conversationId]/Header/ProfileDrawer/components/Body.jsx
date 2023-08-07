export default function Body({ data, otherUser, joinedDate }) {
  return (
    <div className="w-full py-5 sm:px-0 sm:pt-0">
      <div className="space-y-8 px-4 sm:space-y-6 sm:px-6">
        {
          data.isGroup ?
            <div>
              <h3 className="text-sm font-medium text-textsecondary sm:w-40 sm:shrink-0">
                Emails
              </h3>

              <div className="mt-1 text-sm text-textprimary sm:col-span-2">
                {data.users.map((user) => user.email).join(", ")}
              </div>
            </div>
            :
            <>
              <div>
                <h3 className="text-sm font-medium text-textsecondary sm:w-40 sm:shrink-0">
                  Email
                </h3>

                <div className="mt-1 text-sm text-textprimary sm:col-span-2">
                  {otherUser?.email}
                </div>
              </div>

              <hr />
              <div className="">
                <h3 className="text-sm font-medium text-textsecondary sm:w-40 sm:shrink-0">
                  Joined
                </h3>

                <div className="mt-1 text-sm text-textprimary sm:col-span-2">
                  <time dateTime={joinedDate}>
                    {joinedDate}
                  </time>
                </div>
              </div>
            </>
        }
      </div>
    </div>
  );
}