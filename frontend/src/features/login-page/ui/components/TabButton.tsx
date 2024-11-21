import { cn } from "@/shared/misc";

interface TabButtonProps {
  label: string;
  tab: "login" | "register" | "guest";
  activeTab: "login" | "register" | "guest";
  onClick: (tab: "login" | "register" | "guest") => void;
}

function TabButton({ label, tab, activeTab, onClick }: TabButtonProps) {
  return (
    <button
      className={cn(
        "z-10 flex-1 px-6 py-1 transition-colors duration-300",
        activeTab === tab ? "text-white" : "text-[#7A8495]",
      )}
      onClick={() => onClick(tab)}
    >
      {label}
    </button>
  );
}

export { TabButton };
