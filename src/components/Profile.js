import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Box, Container, Flex } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { getUserPosts } from "../features/postsSlice";
import Posts from "./Posts";
import Statistics from "./ProfileStatistics";
import Data from "./ProfileData";

function Profile() {
  const dispatch = useDispatch();
  const { username } = useParams();
  const users = useSelector((state) => state.users);
  const posts = useSelector((state) => state.posts);
  const user = users.data.find((user) => user.username === username);

  useEffect(() => {
    if (!user) return;
    dispatch(getUserPosts(user?.id));
  }, [dispatch, user]);

  return (
    <Container maxW="container.sm" px={[0, 4]} mt={[5, 12]}>
      {user?.username && (
        <Box
          bg="white"
          boxShadow="base"
          borderRadius={["none", "md"]}
          p={[3, 5]}
        >
          <Flex
            columnGap={["0", "0", "12"]}
            rowGap={["3", "4"]}
            alignItems="center"
            flexWrap="wrap"
            flexDirection={["column", "column", "row"]}
          >
            <Avatar
              bg="red.100"
              borderWidth="1px"
              borderColor="red.600"
              size={["xl", "2xl"]}
              name={user.firstName + " " + user.lastName}
              src={user.image}
            />
            <Flex
              gap={["3", "10", "12"]}
              w={["100%", "100%", "auto"]}
              justifyContent="center"
              alignItems="center"
              flexDirection={["column", "row"]}
            >
              <Data user={user} />
              <Statistics user={user} posts={posts} />
            </Flex>
          </Flex>
        </Box>
      )}
      <Posts userId={user?.id} />
    </Container>
  );
}

export default Profile;
