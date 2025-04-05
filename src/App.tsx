import { RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { LiveblocksProvider } from "@liveblocks/react/suspense";
import "./App.css";
import store from "./store/store";
import router from "./router";

const queryClient = new QueryClient();

function App() {
  return (
    <LiveblocksProvider
      publicApiKey={import.meta.env.VITE_LIVEBLOCKS_PUBLIC_KEY}
    >
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </Provider>
    </LiveblocksProvider>
  );
}

export default App;
