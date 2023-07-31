import DesktopSidebar from "./DesktopSidebar";

export default async function Sidebar({ children }) {
  return (
    <div className="h-full">
      <DesktopSidebar />
      
      <main className="h-full lg:pl-20">
        {children}
      </main>
    </div>
  );
}