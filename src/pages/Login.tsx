import {
  Box,
  Button,
  Container,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";

const Login: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Stack
        height={"calc(100vh - 10rem)"}
        direction={"column"}
        justifyContent={"center"}
        spacing={1}
      >
        <Typography variant={"body1"}>Username</Typography>
        <OutlinedInput placeholder="Enter Username" />
        <Box height={16} />
        <Typography variant={"body1"}>Password</Typography>
        <OutlinedInput placeholder="Enter Password" />
        <Box height={16} />
        <Button variant={"contained"}>Login</Button>
      </Stack>
    </Container>
  );
};

export default Login;
