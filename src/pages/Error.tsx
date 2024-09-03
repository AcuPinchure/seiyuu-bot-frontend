import { Container, Alert, AlertTitle, Button } from "@mui/material";
import { useRouteError } from "react-router-dom";

const Error: React.FC = () => {
  const error = useRouteError() as { statusText?: string; message?: string };
  console.error(error);
  return (
    <Container maxWidth="md">
      <Alert
        severity="error"
        action={
          <Button color="inherit" href={"/"}>
            返回首頁
          </Button>
        }
      >
        <AlertTitle>頁面發生錯誤</AlertTitle>
        很抱歉，頁面發生錯誤，原因：{error.statusText || error.message}
      </Alert>
    </Container>
  );
};

export default Error;
