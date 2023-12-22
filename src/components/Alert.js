import {
  Alert as AlertChakra,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

function Alert({ status, title, description }) {
  return (
    <AlertChakra
      status={status}
      variant="top-accent"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      p="5"
      mb="5"
    >
      <AlertIcon boxSize="40px" mr="0" />
      <AlertTitle mt="3" mb="1" mr="0" fontSize="lg">
        {title}
      </AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </AlertChakra>
  );
}

export default Alert;
