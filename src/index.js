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
        bg: "gray.100",
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
