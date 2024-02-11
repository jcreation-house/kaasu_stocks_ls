import { Button, Image, Result } from "antd";
import { useEffect } from "react";
import { redirect } from "react-router-dom";

export const StocksDashboard = () => {
  return (
    <div>
      {/* <Image width={200} src="image_url" /> */}
      <Result
        status="info"
        title="Under Construction"
        subTitle="We are working day and night to bring this feature to you. Your patience is greatly appreciated as we strive to enhance your user experience."
        extra={
          <Button type="primary" href="/">
            Back Home
          </Button>
        }
      />
    </div>
  );
};
