import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AntdConfigProvider } from "./providers/AntdConfigProvider.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/queryClient.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AntdConfigProvider>
        <App />
      </AntdConfigProvider>
    </QueryClientProvider>
  </StrictMode>,
);
