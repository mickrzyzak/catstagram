import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { setAccount } from "../features/usersSlice";
import { resetReactions } from "../features/postsSlice";

function ChangeAccount() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetReactions());
    dispatch(setAccount(null));
  }, [dispatch]);

  return <Navigate to="/my-account" replace={true} />;
}

export default ChangeAccount;
