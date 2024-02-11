import { Button, Flex, Space, Table, Typography } from "antd";
import { StocksAddForm } from "../components/forms/StocksAddForm";
import { deleteItem, getItem, saveItem } from "../backend";
import { redirect, useLoaderData, useSubmit } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";

export const StocksList = () => {
  const handleSubmit = useSubmit();
  const { Title } = Typography;
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
          <Button onClick={() => handleDelete(record.key)} danger>
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  const handleDelete = (id) =>
    handleSubmit(
      { key: "stocks", id },
      { method: "delete", action: "/stocks_list" }
    );
  return (
    <Table
      bordered
      dataSource={companiesStocks}
      columns={columns}
      title={() => (
        <Flex justify="space-between" align="center">
          <Title style={{ textAlign: "center", margin: "10px" }} level={4}>
            Stock List
          </Title>
          <StocksAddForm _action="create" />
        </Flex>
      )}
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
