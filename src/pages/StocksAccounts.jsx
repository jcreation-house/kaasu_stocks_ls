import { Flex, Table, Typography } from "antd";

export const StocksAccounts = () => {
  const { Title } = Typography;
  return (
    <Table
      dataSource={companyStocks}
      columns={columns}
      title={() => (
        <Flex justify="space-between" align="center">
          <Title style={{ textAlign: "center", margin: "10px" }} level={4}>
            Stock List
          </Title>
          {/* <StockForm _action="create" /> */}
        </Flex>
      )}
    />
  );
};
