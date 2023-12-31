import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../features/postsSlice";
import Alert from "./Alert";
import { Container } from "@chakra-ui/react";
import Posts from "./Posts";

function Home() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const posts = useSelector((state) => state.posts);
  const photos = useSelector((state) => state.photos);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (posts.data.length) return;
    dispatch(getPosts());
  }, [dispatch, posts.data.length]);

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
    <Container maxW="container.sm" px={[0, 4]}>
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
