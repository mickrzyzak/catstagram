import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./index.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { store } from "./store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        position: "relative",
        bg: "gray.100",
        bgGradient: ["none", "linear(to-r, gray.200, gray.100)"],
        margin: "0",
        paddingTop: ["66px", "73px"],
        paddingBottom: ["96px", "113px"],
        minW: "320px",
        minH: "100vh",
        overflowY: "scroll",
      },
    }),
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </Provider>
);
