import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import { AuthProvider } from "./firebase";
import { CartTotalProvider } from "./hooks";
import { Layout, Home, Cart } from "./pages";

export const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartTotalProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="" element={<Home />} />
                <Route path="cart" element={<Cart />} />
                {/* NOTE: in a real world situation you would mostly want to have a dedicated 404 not found page in place of this redirect. */}
                <Route path="*" element={<Home />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartTotalProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};
