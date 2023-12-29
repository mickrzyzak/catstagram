import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../features/postsSlice";
import Alert from "./Alert";
import { Container, Box, Heading, Stack, Button } from "@chakra-ui/react";

import Post from "./Post";

function Home() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const posts = useSelector((state) => state.posts);
  const [postsLoading, setPostsLoading] = useState(false);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const handleLoadPosts = () => {
    setPostsLoading(true);
    dispatch(getPosts()).then(() => setPostsLoading(false));
  };

  return (
    <Container maxW="container.sm">
      <Heading
        size="lg"
        color="gray.600"
        textAlign={["center", "left"]}
        my={[6, 8]}
      >
        For you, meow
      </Heading>
      {users.error && (
        <Alert
          status="error"
          title={users.error.title}
          description={users.error.description}
        />
      )}
      {posts.error && (
        <Alert
          status="error"
          title={posts.error.title}
          description={posts.error.description}
        />
      )}
      {!users.error && !posts.error && (
        <Box mb={[8, 12]}>
          <Stack spacing={[8, 12]}>
            {posts.data.map((post) => (
              <Post
                key={post.id}
                post={post}
                user={users.data.find((user) => user.id === post.userId)}
              />
            ))}
          </Stack>
          <Button
            colorScheme="red"
            size="md"
            w="100%"
            variant="outline"
            isLoading={postsLoading}
            loadingText="Loading"
            spinnerPlacement="start"
            mt={[8, 12]}
            onClick={handleLoadPosts}
          >
            Load more
          </Button>
        </Box>
      )}
    </Container>
  );
}

export default Home;
