import React from "react";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`h-h-full layout ml-auto mr-auto grid max-h-[834px] w-full max-w-[520px]`}
    >
      {children}
    </div>
  );
}

export { RootLayout };
