export default function ChatFrame({ children }) {
  return (
    <div className="relative h-full w-full bg-bgsecondary lg:px-20 lg:py-10">
      <div className="absolute left-0 top-0 hidden h-28 w-full bg-accentprimary lg:block"/>

      <div className="relative h-full w-full border border-solid border-borderprimary shadow-lg">
        {children}
      </div>
    </div>
  );
}