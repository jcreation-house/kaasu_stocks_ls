import { Button, Space } from "antd";
import { StocksAddForm } from "../components/forms/StocksAddForm";
import { deleteItem, getItem, saveItem } from "../backend";
import { redirect, useLoaderData, useSubmit } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import { TableViewer } from "../components/TableViewer";

export const StocksList = () => {
  const handleSubmit = useSubmit();

  const { companiesStocks } = useLoaderData();

  const columns = [
    {
      title: "Company",
      dataIndex: "company",
      sorter: (a, b) => a.company.localeCompare(b.company),
      editable: true,
    },
    {
      title: "Symbol",
      dataIndex: "symbol",
      sorter: (a, b) => a.symbol.localeCompare(b.symbol),
      editable: true,
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
                { key: "stocks", id: record.key },
                { method: "delete", action: "/stocks_list" }
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
      data={companiesStocks}
      columns={columns}
      title={"Stock List"}
      child={<StocksAddForm />}
    />
  );
};

export const stocksListLoader = () => {
  const companiesStocks = getItem("stocks");
  return { companiesStocks };
};
export const stocksListAction = async ({ request: req }) => {
  const data = Object.fromEntries(await req.formData());

  switch (req.method) {
    case "POST":
      saveItem("stocks", {
        key: crypto.randomUUID(),
        ...data,
        createAt: Date.now(),
      });
      break;

    case "DELETE":
      deleteItem({ ...data });

      break;

    default:
      break;
  }

  return redirect("/stocks_list");
};
