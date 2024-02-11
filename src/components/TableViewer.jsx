import { Flex, Table, Typography } from "antd";

export const TableViewer = ({ data, columns, title: _title, child }) => {
  const { Title } = Typography;
  return (
    <Table
      bordered
      dataSource={data}
      columns={columns}
      title={() => (
        <Flex justify="space-between" align="center">
          <Title style={{ textAlign: "center", margin: "10px" }} level={4}>
            {_title}
          </Title>
          {child}
        </Flex>
      )}
    />
  );
};
