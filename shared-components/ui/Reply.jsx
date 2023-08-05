import clsx from "clsx";

export default function Reply({ data, onClick }) {
  return (
    <div className={clsx(
      "flex w-full gap-x-2 overflow-hidden rounded-lg bg-neutral-300 transition",
      onClick && "cursor-pointer hover:bg-[rgb(200,200,200)]"
    )}>

      <div className="w-1 shrink-0 bg-sky-500"/>

      <div className="w-full py-2">
        <p className="w-full text-sm font-semibold text-sky-500">
          {data.sender.name}
        </p>

        <p className="w-full text-sm text-gray-500">
          {data.body}
        </p>
      </div>
    </div>
  );
}