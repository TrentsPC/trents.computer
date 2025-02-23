// @refresh reload
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import "./styles/app.css";
import "./styles/reset.css";
import "./styles/soehne-mono.css";
import "./styles/soehne.css";

// export default function App() {
//   return (
//     <Router
//       root={(props) => (
//         <QueryClientProvider client={new QueryClient()}>
//           <MetaProvider>
//             <Title>Trents PC</Title>
//             <Suspense>{props.children}</Suspense>
//           </MetaProvider>
//         </QueryClientProvider>
//       )}
//     >
//       <FileRoutes />
//     </Router>
//   );
// }

import { RouterProvider, createRouter } from "@tanstack/solid-router";
import { routeTree } from "./routeTree.gen";

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultStaleTime: 5000,
  scrollRestoration: true,
});

// Register things for typesafety
declare module "@tanstack/solid-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
