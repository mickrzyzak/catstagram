import { Text } from "@chakra-ui/react";

function FooterText({ children }) {
  return (
    <Text fontSize={["sm", "md"]} color="gray.600">
      {children}
    </Text>
  );
}

export default FooterText;
