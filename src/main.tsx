import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material/styles";
import { muiTheme } from "./theme";
import { AuthProvider } from "./context/AuthContext";
import ErrorBoundary from "./components/core/containers/ErrorBoundary";
import { ToastContainer } from 'react-toastify';

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

const renderApp = () => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <ErrorBoundary>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={muiTheme}>
                <ToastContainer
                position="bottom-center"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                style={{ zIndex: 9999, fontSize: '0.8rem',fontWeight: '400' }}
              />
              <App />
            </ThemeProvider>
          </QueryClientProvider>
        </AuthProvider>
      </ErrorBoundary>
    </StrictMode>
  );
};

if (MODE === "dev") {
  import("./mocks/browser").then(({ worker }) => {
    worker.start().then(() => {
      renderApp();
    });
  });
} else {
  renderApp();
}
