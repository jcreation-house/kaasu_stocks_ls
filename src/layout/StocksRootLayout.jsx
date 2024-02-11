import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Flex, Layout, Menu, Switch, Typography } from "antd";

export const StocksRootLayout = () => {
  const { Title } = Typography;
  const { Header, Content } = Layout;

  const [current, setCurrent] = useState(useLocation().pathname);

  const userName = "Alpha"; // static name now >> has to add functon for username
  const items = [
    {
      label: <Link to="/">Dashboard</Link>,
      key: "/",
      //   icon: <MailOutlined />,
    },
    {
      label: <Link to="transactions">Transactions</Link>,
      key: "/transactions",
    },
    {
      label: <Link to="accounts">Accounts</Link>,
      key: "/accounts",
    },
    {
      key: "/stocks_list",
      label: <Link to={"/stocks_list"}>stocks list</Link>,
    },
  ];

  return (
    <Layout>
      <Header style={{ background: "white" }}>
        <Flex justify={"space-between"} align={"center"}>
          <Title level={4}>{userName}'s Dashboard</Title>
          {/* //toggle themes need to work on
           <Flex wrap="wrap" gap="small" align={"center"}>
            <Switch size="small">Dark/Light</Switch>
          </Flex> */}
        </Flex>
      </Header>
      <Content>
        <Menu
          onClick={(e) => setCurrent(e.key)}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />
        <Content style={{ padding: "10px 20px" }}>
          <Outlet />
        </Content>
      </Content>
    </Layout>
  );
};
