import { useEffect, useState } from "react";
import { PlusSquareOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Row,
  Select,
  Typography,
} from "antd";
import { useSubmit } from "react-router-dom";
import { StocksAccountForm } from "./StocksAccountForm";
import { StocksAddForm } from "./StocksAddForm";
import TextArea from "antd/es/input/TextArea";

export const StocksTransactionForm = ({ accounts = [], stocks = [] }) => {
  const handleSubmit = useSubmit();
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const { Option } = Select;

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = (value) => {
    form
      .validateFields()
      .then((values) => {
        handleSubmit(values, {
          method: "post",
          action: "/stocks_transactions",
        });

        form.resetFields();
        value === "submit" ?? setVisible(false);
      })
      .catch((info) => {
        // console.log("Validation Failed:", info);
        null;
      });
  };

  const handleCancel = (e) => {
    setVisible(false);
  };

  return (
    <>
      <Button
        // type="primary"
        onClick={showModal}
        // style={{
        //   backgroundColor: "green",
        //   borderColor: "green",
        //   color: "white",
        // }}
      >
        <PlusSquareOutlined />
      </Button>
      <Modal
        title={
          <Typography.Title
            type="secondary"
            style={{ textAlign: "center" }}
            level={3}
          >
            Add Accounts
          </Typography.Title>
        }
        open={visible}
        onCancel={handleCancel}
        footer={[
          <Flex justify="space-around" key={"flex"}>
            <div>
              <Button key="add" onClick={() => handleOk("add")}>
                Add
              </Button>
            </div>
            <Flex gap={6}>
              <Button key="back" onClick={handleCancel}>
                Return
              </Button>

              <Button
                key="submit"
                type="primary"
                onClick={() => handleOk("submit")}
              >
                Submit
              </Button>
            </Flex>
          </Flex>,
        ]}
      >
        <Form
          layout="horizontal"
          name="transaction_form"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 15,
          }}
          style={{
            maxWidth: 600,
          }}
          form={form}
        >
          <Row>
            <Col span={21}>
              <Form.Item
                name="transactionType"
                label="Transaction Type"
                rules={[
                  {
                    required: true,
                    message: "missing Transaction Type!",
                  },
                ]}
              >
                <Radio.Group>
                  <Radio value={1}>Buy</Radio>
                  <Radio value={-1}>Sell</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={21}>
              <Form.Item
                name="accountName"
                label="Account Name"
                rules={[
                  {
                    required: true,
                    message: "missing Account Name!",
                  },
                ]}
              >
                <Select name="accountName">
                  {accounts.map((account) => (
                    <Option key={account.key} value={account.accountName}>
                      {account.accountName} : {account.accountBank}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={1}>
              <StocksAccountForm />
            </Col>
            <Col span={21}>
              <Form.Item
                name="stockSymbol"
                label="Stock Symbol"
                rules={[
                  {
                    required: true,
                    message: "missing the Stock Symbol!",
                  },
                ]}
              >
                <Select>
                  {stocks.map((stock) => (
                    <Option key={stock.key} value={stock.symbol}>
                      {stock.symbol}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={1}>
              <StocksAddForm />
            </Col>
            <Col span={21}>
              <Form.Item
                name="date"
                label="Date"
                initialValue={new Date().toJSON().slice(0, 10)}
                rules={[{ required: true, message: "missing the date!" }]}
              >
                <Input type="date" />
              </Form.Item>
            </Col>
            <Col span={21}>
              <Form.Item
                name="shares"
                label="Shares"
                rules={[{ required: true, message: "missing # of shares!" }]}
              >
                <Input style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={21}>
              <Form.Item
                name="price"
                initialValue={0}
                label="Price"
                rules={[{ required: true, message: "missing 1 share price!" }]}
              >
                <Input prefix="$" />
              </Form.Item>
            </Col>
            <Col span={21}>
              <Form.Item
                name={"commission"}
                initialValue={0}
                label="Commission"
                rules={[
                  { required: true, message: "missing Commission input" },
                ]}
              >
                <Input prefix="$" />
              </Form.Item>
            </Col>
            <Col span={21}>
              <Form.Item
                name="details"
                label="Transaction Details"
                initialValue={""}
              >
                <TextArea placeholder="...." status={""} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};
