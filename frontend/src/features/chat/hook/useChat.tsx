import React from "react";
import { ChatContext } from "../provider/ChatProvider";

function useChat() {
  const context = React.useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}

export { useChat };
