import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Box, Container, Flex, Text, Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { getUserPosts } from "../features/postsSlice";
import Posts from "./Posts";

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

function ProfileData({ user }) {
  return (
    <Box textAlign={["center", "left"]}>
      <Heading size={["md", "sm"]} mb="1" color="red.600">
        {user.firstName + " " + user.lastName}
      </Heading>
      <ProfileText name="Username" value={user.username} />
      <ProfileText name="E-mail" value={user.email} />
      <ProfileText name="Phone" value={user.phone} />
    </Box>
  );
}

function ProfileStatistics({ user, posts }) {
  return (
    <Box textAlign={["center", "left"]}>
      <Heading size={["md", "sm"]} mb="1" color="red.600">
        Statistics
      </Heading>
      <Flex columnGap="4" flexDirection={["row", "column"]}>
        <ProfileText
          name="Likes"
          value={posts.data
            .filter((post) => post.userId === user.id)
            .reduce((sum, post) => sum + post.reactions, 0)}
        />
        <ProfileText
          name="Posts"
          value={posts.data.filter((post) => post.userId === user.id)?.length}
        />
        <ProfileText
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
              <ProfileData user={user} />
              <ProfileStatistics user={user} posts={posts} />
            </Flex>
          </Flex>
        </Box>
      )}
      <Posts userId={user?.id} />
    </Container>
  );
}

export default Profile;
