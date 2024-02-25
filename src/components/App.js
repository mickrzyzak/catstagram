import { useEffect } from "react";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";
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
  const { pathname } = useLocation();

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
