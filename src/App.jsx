import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { StocksRootLayout } from "./layout/StocksRootLayout";
import { StocksDashboard } from "./pages/StocksDashboard";
import {
  StocksList,
  stocksListAction,
  stocksListLoader,
} from "./pages/StocksList";
import {
  StocksAccounts,
  StocksAccountsAction,
  StocksAccountsLoader,
} from "./pages/StocksAccounts";
import {
  StocksTrans,
  StocksTransAction,
  StocksTransLoader,
} from "./pages/StocksTransactions";

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
          path: "stocks_accounts",
          element: <StocksAccounts />,
          loader: StocksAccountsLoader,
          action: StocksAccountsAction,
          // errorElement: <Error />,
        },
        {
          path: "stocks_transactions",
          element: <StocksTrans />,
          loader: StocksTransLoader,
          action: StocksTransAction,
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
