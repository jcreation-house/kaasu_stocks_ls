import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { StocksRootLayout } from "./layout/StocksRootLayout";
import { StocksDashboard } from "./pages/StocksDashboard";
import {
  StocksList,
  stocksListAction,
  stocksListLoader,
} from "./pages/StocksList";
import { StocksAccounts } from "./pages/StocksAccounts";
import { StocksTransactions } from "./pages/StocksTransactions";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <StocksRootLayout />,
      errorElement: <h1>something broken 😔</h1>,
      children: [
        {
          path: "/",
          element: <StocksDashboard />,
          // // loader: stocksLoader,
          // // action: stocksAction,
          // errorElement: <Error />,
        },
        {
          path: "stocks_list",
          element: <StocksList />,
          loader: stocksListLoader,
          action: stocksListAction,
          // errorElement: <Error />,
        },
        {
          path: "accounts",
          element: <StocksAccounts />,
          // loader: accountsLoader,
          // action: accountsAction,
          // errorElement: <Error />,
        },
        {
          path: "transactions",
          // element: <StocksTransactions />,
          // loader: transactionsLoader,
          // action: transactionsAction,
          // errorElement: <Error />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
