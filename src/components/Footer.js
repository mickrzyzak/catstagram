import { Container, Box, Text, Link } from "@chakra-ui/react";

function FooterText({ children }) {
  return (
    <Text fontSize={["sm", "md"]} color="gray.600">
      {children}
    </Text>
  );
}

function Footer() {
  return (
    <Box
      py={[4, 5]}
      bgColor="white"
      position="absolute"
      bottom="0"
      left="0"
      w="100%"
      zIndex="1"
      borderTop="1px"
      borderColor="red.600"
      borderStyle="dashed"
      boxShadow="base"
    >
      <Container maxW="container.md" textAlign={["center", "left"]} px={[3, 5]}>
        <FooterText>
          Application created by{" "}
          <Link
            href="https://github.com/mickrzyzak/catstagram"
            target="_blank"
            color="red.600"
          >
            mickrzyzak on GitHub
          </Link>
          .
        </FooterText>
        <FooterText>
          Post and user data comes from{" "}
          <Link
            href="https://dummyjson.com"
            target="_blank"
            rel="noindex nofollow"
            color="red.600"
          >
            DummyJSON
          </Link>
          .
        </FooterText>
        <FooterText>
          Cat photos come from{" "}
          <Link
            href="https://thecatapi.com"
            target="_blank"
            rel="noindex nofollow"
            color="red.600"
          >
            The Cat API
          </Link>
          .
        </FooterText>
      </Container>
    </Box>
  );
}

export default Footer;
