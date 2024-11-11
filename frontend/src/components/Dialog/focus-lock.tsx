import React from "react";
import { useFocusLock } from "./hook";

interface FocusLockProps {
	children: React.ReactNode;
}

export const FocusLock: React.FC<FocusLockProps> = ({ children }) => {
	const containerRef = React.useRef<HTMLDivElement>(null);
	useFocusLock(containerRef);

	return (
		<div className="outline-none" aria-modal="true" tabIndex={-1}>
			{children}
		</div>
	);
};
