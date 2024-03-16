import { Text } from "@chakra-ui/react";

function ProfileText({ name, value }) {
  return (
    <Text fontSize="sm">
      <Text as="span" color="gray.600">
        {name}:
      </Text>
      {` ${value}`}
    </Text>
  );
}

export default ProfileText;
