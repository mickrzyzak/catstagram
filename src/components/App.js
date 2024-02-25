import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import { getUser, setAccount } from "../features/usersSlice";
import Navbar from "./Navbar";
import Home from "./Home";
import Profile from "./Profile";
import MyAccount from "./MyAccount";
import ChangeAccount from "./ChangeAccount";
import Footer from "./Footer";
import PageNotFound from "./PageNotFound";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

function App() {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.users.account);
  const { pathname } = useLocation();

  // Get initial account
  useEffect(() => {
    if (account) return;

    const randomAccountId = Math.floor(Math.random() * 100) + 1;
    dispatch(getUser(randomAccountId));
    dispatch(setAccount(randomAccountId));
  }, [dispatch, account]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="/change-account" element={<ChangeAccount />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
