import { useState } from "react";
import { useSubmit } from "react-router-dom";
import { PlusSquareOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Typography } from "antd";

export const StocksAddForm = ({ _action }) => {
  const [form] = Form.useForm();
  const handleSubmit = useSubmit();
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
        form.resetFields();
        setVisible(false);
        handleSubmit(values, { method: "post", action: "/stocks_list" });
        console.log(values);
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
            Add Stock
          </Typography.Title>
        }
        onCancel={handleCancel}
        open={visible}
        footer={() => (
          <>
            <Button onClick={handleOk}>Submit</Button>
          </>
        )}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item
            name="company"
            label="Company Name"
            rules={[
              { required: true, message: "Please input the company name!" },
            ]}
          >
            <Input placeholder="Microsoft Corporation" />
          </Form.Item>
          <Form.Item
            name="symbol"
            label="symbol"
            rules={[
              { required: true, message: "Please input the stock symbol!" },
            ]}
          >
            <Input placeholder="MSFT" status={""} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
