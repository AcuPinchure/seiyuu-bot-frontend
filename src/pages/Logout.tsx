import useAccountStore from "@/stores/useAccountStore";
import { clearAxiosCache } from "@/api/axiosInstance";

const Logout: React.FC = () => {
  /* handle logout */
  const logout = useAccountStore((state) => state.logout);
  logout().then(() => {
    clearAxiosCache();
    window.location.href = "/stats";
  });

  return <>Logging out...</>;
};

export default Logout;
