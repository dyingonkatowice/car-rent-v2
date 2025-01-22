import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./componentsAdmin/app-sidebar";
type AdminPannelProps = {
  userName: string;
  logOut: () => void;
};
export default function AdminPannel({ userName, logOut }: AdminPannelProps) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar userName={userName} logOut={logOut} />
        <main>
          <div className="h-screen flex items-center justify-center">hi</div>
        </main>
      </SidebarProvider>
    </>
  );
}
