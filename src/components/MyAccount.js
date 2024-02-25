import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function MyAccount() {
  const users = useSelector((state) => state.users);
  const accountUser = users.data.find((user) => user.id === users.account);

  if (!accountUser) return false;

  return <Navigate to={`/profile/${accountUser.username}`} replace={true} />;
}

export default MyAccount;
