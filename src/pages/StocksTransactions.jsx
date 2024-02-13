import { Button, Space } from "antd";
import { TableViewer } from "../components/TableViewer";
import { DeleteOutlined } from "@ant-design/icons";
import { StocksTransactionForm } from "../components/forms/StocksTransactionForm";
import { deleteItem, getItem, saveItem } from "../backend";
import { redirect, useLoaderData, useSubmit } from "react-router-dom";

export const StocksTrans = () => {
  const { accounts, stocks, stocksTranscations } = useLoaderData();
  const handleSubmit = useSubmit();
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: "Account",
      dataIndex: "accountName",
      // sorter: (a, b) => a.account.localeCompare(b.account),
    },
    {
      title: "Symbol",
      dataIndex: "stockSymbol",
    },
    {
      title: "shares",
      dataIndex: "shares",
    },
    {
      title: "price",
      dataIndex: "price",
    },
    {
      title: "commission",
      dataIndex: "commission",
    },
    {
      title: "Total",
      dataIndex: "total",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space
        //  style={{ justifyContent: "center", width: "100%" }}
        >
          <Button
            onClick={() =>
              handleSubmit(
                { key: "transactions", id: record.key },
                { method: "delete", action: "/stocks_transactions" }
              )
            }
            danger
          >
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <TableViewer
      data={stocksTranscations}
      columns={columns}
      title={"Stocks Transaction"}
      child={<StocksTransactionForm accounts={accounts} stocks={stocks} />}
    />
  );
};

export const StocksTransLoader = async () => {
  const accounts = await getItem("accounts");
  const stocks = await getItem("stocks");
  const stocksTranscations = await getItem("transactions");

  return { accounts, stocks, stocksTranscations };
};

export const StocksTransAction = async ({ request: req }) => {
  const data = Object.fromEntries(await req.formData());

  switch (req.method) {
    case "POST":
      saveItem("transactions", {
        key: crypto.randomUUID(),
        ...data,
        total: (
          (Number(data.shares) * Number(data.price) + Number(data.commission)) *
          Number(data.transactionType)
        ).toFixed(2),
        createAt: Date.now(),
      });
      break;

    case "DELETE":
      deleteItem({ ...data });

      break;

    default:
      break;
  }

  return redirect("/stocks_transactions");
};
