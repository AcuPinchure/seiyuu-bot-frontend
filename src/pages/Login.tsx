import useAccountStore from "@/stores/useAccountStore";
import {
  Box,
  Container,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useEffect } from "react";
import { clearAxiosCache } from "@/api/axiosInstance";

const Login: React.FC = () => {
  const { isLoading, login, user } = useAccountStore();

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    login(username, password);
  }

  useEffect(() => {
    if (user.id !== 0) {
      clearAxiosCache();
      window.location.href = "/stats";
    }
  }, [user.id]);

  return (
    <Container maxWidth="sm">
      <Stack
        component={"form"}
        height={"calc(100vh - 10rem)"}
        direction={"column"}
        justifyContent={"center"}
        spacing={1}
        onSubmit={handleLogin}
      >
        <Typography variant={"body1"}>Username</Typography>
        <OutlinedInput
          placeholder="Enter Username"
          disabled={isLoading.login}
          name="username"
        />
        <Box height={16} />
        <Typography variant={"body1"}>Password</Typography>
        <OutlinedInput
          placeholder="Enter Password"
          disabled={isLoading.login}
          type="password"
          name="password"
        />
        <Box height={16} />
        <LoadingButton
          variant={"contained"}
          loading={isLoading.login}
          type="submit"
        >
          Login
        </LoadingButton>
      </Stack>
    </Container>
  );
};

export default Login;
