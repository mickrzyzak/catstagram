import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./index.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { store } from "./store";
import { Provider } from "react-redux";

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        position: "relative",
        bg: "gray.100",
        bgGradient: ["none", "linear(to-r, gray.200, gray.100)"],
        paddingTop: ["67px", "72px"],
        paddingBottom: ["104px", "113px"],
        minW: "320px",
        minH: "100vh",
      },
    }),
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </Provider>
);
