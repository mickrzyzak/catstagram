import { Box, Heading } from "@chakra-ui/react";
import Text from "./ProfileText";

function ProfileData({ user }) {
  return (
    <Box textAlign={["center", "left"]}>
      <Heading size={["md", "sm"]} mb="1" color="red.600">
        {user.firstName + " " + user.lastName}
      </Heading>
      <Text name="Username" value={user.username} />
      <Text name="E-mail" value={user.email} />
      <Text name="Phone" value={user.phone} />
    </Box>
  );
}

export default ProfileData;
