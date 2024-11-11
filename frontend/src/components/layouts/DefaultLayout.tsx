import Header from "../Header";
import MainContent from "../MainContent";
import Sidebar from "../Sidebar";

function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center">
      <div className="w-[530px] bg-[#E6EDF8]">
        <Header />
        <div role="main" className="flex w-full">
          <Sidebar />
          {children || <MainContent />}
        </div>
      </div>
    </div>
  );
}

export default DefaultLayout;
