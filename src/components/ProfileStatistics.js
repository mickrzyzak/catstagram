import { Box, Flex, Heading } from "@chakra-ui/react";
import Text from "./ProfileText";

function ProfileStatistics({ user, posts }) {
  return (
    <Box textAlign={["center", "left"]}>
      <Heading size={["md", "sm"]} mb="1" color="red.600">
        Statistics
      </Heading>
      <Flex columnGap="4" flexDirection={["row", "column"]}>
        <Text
          name="Likes"
          value={posts.data
            .filter((post) => post.userId === user.id)
            .reduce((sum, post) => sum + post.reactions, 0)}
        />
        <Text
          name="Posts"
          value={posts.data.filter((post) => post.userId === user.id)?.length}
        />
        <Text
          name="Comments"
          value={posts.data
            .filter((post) => post.userId === user.id)
            .reduce(
              (sum, post) => sum + (post.comments ? post.comments.length : 0),
              0
            )}
        />
      </Flex>
    </Box>
  );
}

export default ProfileStatistics;
