import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPosts } from "../features/postsSlice";
import { Box, Stack, Button } from "@chakra-ui/react";
import Post from "./Post";

function Posts({ posts, users, photos }) {
  const dispatch = useDispatch();
  const [postsLoading, setPostsLoading] = useState(true);

  const handleLoadPosts = () => {
    setPostsLoading(true);
    dispatch(getPosts()).then(() => setPostsLoading(false));
  };

  useEffect(() => {
    if (photos.data.length > 0) setPostsLoading(false);
  }, [photos]);

  return (
    <Box my={[5, 12]}>
      <Stack spacing={[5, 12]}>
        {posts.data.map((post) => (
          <Post
            key={post.id}
            post={post}
            user={users.data.find((user) => user.id === post.userId)}
            photo={photos.data.find((photo) => photo.postId === post.id)}
          />
        ))}
      </Stack>
      <Box px={[3, 0]} mt={[5, 12]}>
        <Button
          colorScheme="red"
          size="md"
          w="100%"
          variant="outline"
          bgColor="white"
          boxShadow="base"
          isLoading={postsLoading}
          loadingText="Loading"
          spinnerPlacement="start"
          onClick={handleLoadPosts}
        >
          Load more
        </Button>
      </Box>
    </Box>
  );
}

export default Posts;
