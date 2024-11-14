import React from "react";
import { createLink, LinkComponent, useLocation } from "@tanstack/react-router";

interface LinkComponentProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  icon: React.ReactNode;
  label: string;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkComponentProps>(
  ({ icon, label, className, ...props }, ref) => {
    const location = useLocation();
    const isChecked = location.pathname.includes(label.split(" ")[0]);

    return (
      <a ref={ref} {...props} className="w-full">
        <label htmlFor={`nav-item-${label}`} className={className}>
          <input
            id={`nav-item-${label}`}
            type="radio"
            name={"nav-item"}
            value={label}
            checked={isChecked}
            disabled
          />
          {icon}
          <span className="font-nanum-eb text-xs">{label}</span>
        </label>
      </a>
    );
  },
);

const CreatedLinkComponent = createLink(Link);

const NavItem: LinkComponent<typeof Link> = (props) => {
  return (
    <CreatedLinkComponent
      className="font-nanum-b flex cursor-pointer flex-col items-center gap-2 text-center"
      preload="intent"
      {...props}
    />
  );
};

export { NavItem };
