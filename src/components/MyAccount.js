import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getUser, setAccount } from "../features/usersSlice";

function MyAccount() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const accountUser = users.data.find((user) => user.id === users.account);

  // Get initial account
  useEffect(() => {
    if (users.account) return;

    const randomAccountId = Math.floor(Math.random() * 100) + 1;
    dispatch(getUser(randomAccountId));
    dispatch(setAccount(randomAccountId));
  }, [dispatch, users]);

  if (!accountUser) return false;

  return <Navigate to={`/profile/${accountUser.username}`} replace={true} />;
}

export default MyAccount;
