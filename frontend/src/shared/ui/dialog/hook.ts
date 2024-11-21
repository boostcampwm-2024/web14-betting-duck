import React from "react";

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll(
      "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])",
    ),
  );
}

function handleTabKey(event: KeyboardEvent, container: HTMLElement) {
  if (event.key !== "Tab") return;

  const focusableElements = getFocusableElements(container);
  const firstFocusable = focusableElements[0];
  const lastFocuable = focusableElements[focusableElements.length - 1];

  if (event.shiftKey && document.activeElement === firstFocusable) {
    event.preventDefault();
    lastFocuable.focus();
  } else if (!event.shiftKey && document.activeElement === lastFocuable) {
    event.preventDefault();
    firstFocusable.focus();
  }
}

function handleEscapeKey(event: KeyboardEvent, toggleOpen: () => void) {
  if (event.key === "Escape") {
    event.preventDefault();
    toggleOpen();
  }
}

function handleOutsideClick(
  event: MouseEvent,
  container: HTMLElement,
  toggleOpen: () => void,
) {
  if (container.contains(event.target as Node)) return;
  event.preventDefault();
  event.stopPropagation();
  toggleOpen();
}

export function useFocusLock(
  containerRef: React.RefObject<HTMLDivElement>,
  toggleOpen: () => void,
) {
  const previousActiveElement = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (containerRef.current === null) return;
    previousActiveElement.current = document.activeElement as HTMLElement;
    const container = containerRef.current as HTMLElement;
    if (container) {
      container.focus();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      handleTabKey(event, container);
      handleEscapeKey(event, toggleOpen);
    };
    const handleMouseDown = (event: MouseEvent) =>
      handleOutsideClick(event, container, toggleOpen);

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleMouseDown);
      previousActiveElement.current?.focus();
    };
  }, [containerRef, toggleOpen]);
}
