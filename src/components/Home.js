import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../features/postsSlice";
import Alert from "./Alert";
import { Container, Box, Heading, Stack, Button } from "@chakra-ui/react";
import Post from "./Post";

function Posts({ posts, users, photos }) {
  const dispatch = useDispatch();
  const [postsLoading, setPostsLoading] = useState(false);

  const handleLoadPosts = () => {
    setPostsLoading(true);
    dispatch(getPosts()).then(() => setPostsLoading(false));
  };

  return (
    <Box mb={[8, 12]}>
      <Stack spacing={[8, 12]}>
        {posts.data.map((post) => (
          <Post
            key={post.id}
            post={post}
            user={users.data.find((user) => user.id === post.userId)}
            photo={photos.data.find((photo) => photo.postId === post.id)}
          />
        ))}
      </Stack>
      <Button
        colorScheme="red"
        size="md"
        w="100%"
        variant="outline"
        bgColor="white"
        boxShadow="md"
        mt={[8, 12]}
        isLoading={postsLoading}
        loadingText="Loading"
        spinnerPlacement="start"
        onClick={handleLoadPosts}
      >
        Load more
      </Button>
    </Box>
  );
}

function Home() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const posts = useSelector((state) => state.posts);
  const photos = useSelector((state) => state.photos);
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    [users, posts, photos].every((data) => {
      if (!data.error) return true;
      setError({
        title: data.error.title,
        description: data.error.description,
      });
      return false;
    });
  }, [users, posts, photos]);

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
      {error ? (
        <Alert
          status="error"
          title={error.title}
          description={error.description}
        />
      ) : (
        <Posts posts={posts} users={users} photos={photos} />
      )}
    </Container>
  );
}

export default Home;
