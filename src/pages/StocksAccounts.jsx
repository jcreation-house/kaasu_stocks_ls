import { redirect, useLoaderData, useSubmit } from "react-router-dom";
import { deleteItem, getItem, saveItem } from "../backend";
import { TableViewer } from "../components/TableViewer";
import { StocksAccountForm } from "../components/forms/StocksAccountForm";
import { Button, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

export const StocksAccounts = () => {
  const { accounts } = useLoaderData();
  const handleSubmit = useSubmit();

  const columns = [
    {
      title: "Name",
      dataIndex: "accountName",
      sorter: (a, b) => a.account.localeCompare(b.account),
    },
    {
      title: "Type",
      dataIndex: "accountType",
      // sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: "Bank",
      dataIndex: "accountBank",
      // sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: "Status",
      dataIndex: "accountStatus",
      // sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: "Details",
      dataIndex: "accountDetails",
      // sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: "Balance",
      dataIndex: "accountBalance",
      // sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: "Action",
      key: "action",
      width: "100px",
      render: (record) => (
        <Space
        //  style={{ justifyContent: "center", width: "100%" }}
        >
          <Button
            onClick={() =>
              handleSubmit(
                { key: "accounts", id: record.key },
                { method: "delete", action: "/stocks_accounts" }
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
      data={accounts}
      columns={columns}
      title={"Stock Accounts"}
      child={<StocksAccountForm />}
    />
  );
};

export const StocksAccountsLoader = () => {
  const accounts = getItem("accounts");
  return { accounts };
};

export const StocksAccountsAction = async ({ request: req }) => {
  const data = Object.fromEntries(await req.formData());

  switch (req.method) {
    case "POST":
      saveItem("accounts", {
        key: crypto.randomUUID(),
        ...data,
        accountBalance: 0,
        createAt: Date.now(),
      });
      break;

    case "DELETE":
      deleteItem({ ...data });
      break;

    default:
      break;
  }

  return redirect("/stocks_accounts");
};
