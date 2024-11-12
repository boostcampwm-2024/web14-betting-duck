import Header from "../Header";
import MainContent from "../MainContent";
import Sidebar from "../Sidebar";

function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-layout-background flex h-screen items-center justify-center p-4">
      <div className="max-h-layout max-w-layout shadow-far box-border h-[780px] w-[520px] rounded-lg">
        <Header />
        <div role="main" className="flex h-full w-full">
          <Sidebar />
          {children || <MainContent />}
        </div>
      </div>
    </div>
  );
}

export default DefaultLayout;
