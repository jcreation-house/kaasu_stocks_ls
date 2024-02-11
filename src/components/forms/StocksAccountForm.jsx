import React, { useState } from "react";
import { useLocation, useSubmit } from "react-router-dom";
import { Button, Typography, Modal, Form, Input, Select } from "antd";

import TextArea from "antd/es/input/TextArea";
import { PlusSquareOutlined } from "@ant-design/icons";

export const StocksAccountForm = () => {
  const handleSubmit = useSubmit();

  const { Option } = Select;
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const showModal = () => {
    setVisible(true);
    form.setFieldsValue({});
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values);
        setVisible(false);
        handleSubmit(values, { method: "post", action: "/stocks_accounts" });

        form.resetFields();
      })
      .catch((info) => {
        // console.log("Validation Failed:", info);
        null;
      });
  };

  return (
    <>
      <Button onClick={showModal}>
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
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Submit
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="horizontal"
          name="Account_form"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item
            name="accountName"
            label="Account Name"
            rules={[
              { required: true, message: "Please input the Account Name!" },
            ]}
          >
            <Input placeholder="Cheq01" />
          </Form.Item>

          <Form.Item
            name="accountType"
            label="Account Type"
            rules={[
              { required: true, message: "Please input the account type!" },
            ]}
          >
            <Select>
              <Option value="chequing ">chequing </Option>
              <Option value="saving">saving</Option>
              <Option value="CASH">cash</Option>
              <Option value="stocks">stocks</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="accountBank"
            label="Account At"
            rules={[
              { required: true, message: "Please input the account At!" },
            ]}
          >
            <Input placeholder="bank123" status={""} />
          </Form.Item>
          <Form.Item
            label="Account status"
            name={"accountStatus"}
            rules={[
              { required: true, message: "Please input the account status!" },
            ]}
          >
            <Select>
              <Option value="open">open</Option>
              <Option value="close">close</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="accountDetails"
            label="Account Details"
            rules={[
              { required: true, message: "Please input the account details!" },
            ]}
          >
            <TextArea placeholder="...." status={""} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
