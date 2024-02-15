import { useState } from "react";
import { Link, Outlet, useLocation, useSubmit } from "react-router-dom";
import {
  ConfigProvider,
  Flex,
  Layout,
  Menu,
  Switch,
  Typography,
  theme,
} from "antd";

export const StocksRootLayout = () => {
  const { Title } = Typography;
  const { Header, Content } = Layout;

  const [current, setCurrent] = useState(useLocation().pathname);
  const [isDark, setIsDark] = useState(false);

  const userName = "Alpha"; // static name now >> has to add functon for username
  const items = [
    {
      label: <Link to="/">Dashboard</Link>,
      key: "/",
      //   icon: <MailOutlined />,
    },
    {
      label: <Link to="stocks_transactions">Transactions</Link>,
      key: "/stocks_transactions",
    },
    {
      label: <Link to="/stocks_accounts">Accounts</Link>,
      key: "/stocks_accounts",
    },
    {
      key: "/stocks_list",
      label: <Link to={"/stocks_list"}>Stocks list</Link>,
    },
  ];

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.lightAlgorithm,
      }}
    >
      <Layout style={{ height: "inherit" }}>
        <Header style={{ background: isDark ? "black" : "white" }}>
          <Flex justify={"space-between"} align={"center"}>
            <Title level={4}>{userName}'s Dashboard</Title>
            {/* //toggle themes need to work on */}
            <Flex wrap="wrap" gap="small" align={"center"}>
              <Switch onChange={(e) => setIsDark(e)} size="small">
                Dark/Light
              </Switch>
            </Flex>
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
    </ConfigProvider>
  );
};
