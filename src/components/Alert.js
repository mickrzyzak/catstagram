import {
  Alert as AlertChakra,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Container,
} from "@chakra-ui/react";

function Alert({ status, title, description }) {
  return (
    <Container maxW="container.sm" my={[5, 12]} px={[3, 0]}>
      <AlertChakra
        status={status}
        variant="top-accent"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        p="5"
      >
        <AlertIcon boxSize="40px" mr="0" />
        <AlertTitle mt="3" mb="1" mr="0" fontSize="lg">
          {title}
        </AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </AlertChakra>
    </Container>
  );
}

export default Alert;
