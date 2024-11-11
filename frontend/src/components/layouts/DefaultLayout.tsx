import Header from "../Header";
import MainContent from "../MainContent";
import Sidebar from "../Sidebar";

function DefaultLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex justify-center">
			<div className="w-[530px] bg-slate-500">
				<Header />
				<div role="main" className="flex">
					<Sidebar />
					<main tabIndex={-1} aria-label="Main Content Area">
						{children || <MainContent />}
					</main>
				</div>
			</div>
		</div>
	);
}

export default DefaultLayout;
