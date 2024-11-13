// eslint-disable-next-line @typescript-eslint/no-unused-vars
type NavItemType = {
  icon: () => JSX.Element;
  label: string;
  onClick?: () => void;
};

// const navItems = {
//   top: [
//     { icon: UserIcon, label: "my", href: "/my" },
//     { icon: ChatIcon, label: "chat", href: "/chat" },
//     { icon: CreateVoteIcon, label: "create vote", href: "/create-vote" },
//   ],
//   bottom: [{ icon: LoginIcon, label: "Login", href: "/login" }],
// };

function Sidebar() {
  return <div className="bg-layout-sidebar w-1/5 p-4">Sidebar</div>;
}

export default Sidebar;
