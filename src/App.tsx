import React from "react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import store from "./redux/store";
import Header from "./components/navbar";
// import HomePage from './pages/HomePage';
import BrandFilter from "./components/brand-filters";
import ProductList from "./pages/products-page";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Header />
        <div className="w-full min-h-screen bg-slate-100 py-10"><ProductList /></div>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
