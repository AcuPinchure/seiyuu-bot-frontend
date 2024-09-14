import useAccountStore from "@/stores/useAccountStore";

const Logout: React.FC = () => {
  /* handle logout */
  const logout = useAccountStore((state) => state.logout);
  logout().then(() => {
    window.location.href = "/";
  });

  return <>Logging out...</>;
};

export default Logout;
