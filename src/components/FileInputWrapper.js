import { Box } from "@chakra-ui/react";

function FileInputWrapper({ children }) {
  return (
    <Box className="file-input-wrapper" sx={{ position: "relative" }}>
      {children}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          backgroundColor: "var(--chakra-colors-gray-100)",
          width: "100%",
          height: "100%",
          position: "absolute",
          top: "0",
          left: "0",
          transition: "var(--chakra-transition-duration-normal)",
          padding: "0 1rem",
          border: "2px solid var(--chakra-colors-gray-100)",
          borderRadius: "0.375rem",
          pointerEvents: "none",
          ".file-input-wrapper:hover &": {
            borderColor: "var(--chakra-colors-gray-200)",
            backgroundColor: "var(--chakra-colors-gray-200)",
          },
          "input[type=file][aria-invalid=true] ~ &": {
            borderColor: "#E53E3E",
          },
        }}
      >
        Select file
      </Box>
    </Box>
  );
}

export default FileInputWrapper;
