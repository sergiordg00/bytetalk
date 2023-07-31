import Sidebar from "@/shared-components/ui/Sidebar";

export default async function Layout({ children }) {
  return (
    <Sidebar>
      <div className="h-full">
        {children}
      </div>
    </Sidebar>
  );
}