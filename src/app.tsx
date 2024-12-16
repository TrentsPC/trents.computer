// @refresh reload
import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { Suspense } from "solid-js";
import "./styles/app.css";
import "./styles/reset.css";
import "./styles/soehne-mono.css";
import "./styles/soehne.css";

export default function App() {
  return (
    <Router
      root={(props) => (
        <QueryClientProvider client={new QueryClient()}>
          <MetaProvider>
            <Title>Trents PC</Title>
            <Suspense>{props.children}</Suspense>
          </MetaProvider>
        </QueryClientProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
