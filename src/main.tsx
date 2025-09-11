import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material/styles";
import { muiTheme } from "./theme/index.ts";
import { AuthProvider } from "./context/AuthContext/index.tsx";
import ErrorBoundary from "./components/core/containers/ErrorBoundary/index.tsx";

const { MODE } = import.meta.env;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retry: 1,
      refetchOnMount: true,
      _optimisticResults: "optimistic",
    },
    mutations: {
      retry: 1,
    },
  },
});
if (MODE==="dev") {
  import("./mocks/browser").then(({ worker }) => {
    worker.start();
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={muiTheme}>
            <App />
          </ThemeProvider>
        </QueryClientProvider>
      </AuthProvider>
    </ErrorBoundary>
  </StrictMode>
);
