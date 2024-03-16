import { extendTheme } from "@chakra-ui/react";

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
  components: {
    Icon: {
      variants: {
        "image-selected": {
          position: "absolute",
          top: [".25rem", ".5rem"],
          left: [".25rem", ".5rem"],
          backgroundColor: "gray.100",
          borderRadius: "full",
          border: "1px solid",
          borderColor: "gray.100",
          color: "red.600",
        },
      },
    },
  },
});

export default theme;
