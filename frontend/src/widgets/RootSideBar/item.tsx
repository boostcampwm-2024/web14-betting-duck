interface NavItemProps extends React.HTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string;
}

function NavItem({ icon, label, ...props }: NavItemProps) {
  return (
    <button
      className="font-nanum-b flex flex-col items-center gap-2"
      {...props}
    >
      {icon}
      <span className="font-nanum-eb text-xs">{label}</span>
    </button>
  );
}

export { NavItem };
