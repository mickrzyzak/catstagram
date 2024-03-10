import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../features/postsSlice";
import { Box, Stack, Button, Text } from "@chakra-ui/react";
import Alert from "./Alert";
import Post from "./Post";
import NavLink from "./NavLink";

function ActionButton({ children, action, loading }) {
  return (
    <Button
      colorScheme="red"
      size="md"
      w="100%"
      variant="outline"
      bgColor="white"
      boxShadow="base"
      loadingText="Loading"
      spinnerPlacement="start"
      isLoading={loading}
      onClick={action}
    >
      {children}
    </Button>
  );
}

function Posts({ userId }) {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const posts = useSelector((state) => state.posts);
  const photos = useSelector((state) => state.photos);
  const [postsLoading, setPostsLoading] = useState(true);
  const [postsToDisplay, setPostsToDisplay] = useState([]);
  const [error, setError] = useState(null);

  const handleLoadPosts = () => {
    setPostsLoading(true);
    dispatch(getPosts()).then(() => setPostsLoading(false));
  };

  // Get initial posts
  useEffect(() => {
    if (posts.data.length) return;
    dispatch(getPosts());
  }, [dispatch, posts.data.length]);

  // Set posts to display
  useEffect(() => {
    let postsTemp = [];
    if (userId) {
      posts.data
        .filter((post) => post.userId === userId)
        .sort((a, b) => a.id - b.id)
        .forEach((post) =>
          postsTemp.push({
            post,
            user: users.data.find((user) => user.id === post?.userId),
            photo: photos.data.find((photo) => photo.postId === post?.id),
          })
        );
    } else {
      // Manually added posts
      posts.data
        .filter((post) => post.id < 0)
        .sort((a, b) => a.id - b.id)
        .forEach((post) =>
          postsTemp.push({
            post,
            user: users.data.find((user) => user.id === post?.userId),
            photo: photos.data.find((photo) => photo.postId === post?.id),
          })
        );
      // Posts from API
      for (let i = 1; i <= posts.count; i++) {
        let post = posts.data.find((post) => post.id === i);
        postsTemp.push({
          post,
          user: users.data.find((user) => user.id === post?.userId),
          photo: photos.data.find((photo) => photo.postId === post?.id),
        });
      }
    }
    setPostsToDisplay(postsTemp);
  }, [posts.count, posts.data, users.data, users.account, photos.data, userId]);

  // Turn off loading status
  useEffect(() => {
    if (photos.data.length > 0) setPostsLoading(false);
  }, [photos]);

  // Catch API errors
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

  if (error)
    return (
      <Alert
        status="error"
        title={error.title}
        description={error.description}
      />
    );

  return (
    <Box my={[5, 12]}>
      <Stack spacing={[5, 12]}>
        {postsToDisplay.map((data) => (
          <Post
            key={data.post?.id}
            post={data.post}
            user={data.user}
            photo={data.photo}
          />
        ))}
      </Stack>
      {postsToDisplay.length === 0 && (
        <Box
          bg="white"
          boxShadow="base"
          borderRadius={["none", "md"]}
          p={[3, 5]}
          fontSize="sm"
          textAlign="center"
        >
          <Text fontSize="md" as="b">
            No posts found
          </Text>
        </Box>
      )}
      <Box px={[3, 0]} mt={[5, 12]}>
        {userId ? (
          <NavLink to="/">
            <ActionButton>Back to home page</ActionButton>
          </NavLink>
        ) : (
          posts.data.length < 100 && (
            <ActionButton action={handleLoadPosts} loading={postsLoading}>
              Load more
            </ActionButton>
          )
        )}
      </Box>
    </Box>
  );
}

export default Posts;
