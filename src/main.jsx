import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRouter from "./router/AppRouter";
import { AuthProvider } from "./context/authContext";
import { ChatProvider } from "./layout/chat/context/ChatContext";
import { SummarizerProvider } from "./context/SummarizerContext";

createRoot(document.getElementById("root")).render(
<StrictMode>
  <SummarizerProvider>
    <AuthProvider>
      <ChatProvider>
      <AppRouter />
      </ChatProvider>
    </AuthProvider>
  </SummarizerProvider>
</StrictMode>
);
