import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Container, Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { getUserPosts } from "../features/postsSlice";
import Posts from "./Posts";

function Profile() {
  const dispatch = useDispatch();
  const { username } = useParams();
  const users = useSelector((state) => state.users);
  const user = users.data.find((user) => user.username === username);

  useEffect(() => {
    if (!user) return;
    dispatch(getUserPosts(user?.id));
  }, [dispatch, user]);

  return (
    <Container maxW="container.sm" px={[0, 4]}>
      {user?.username && (
        <Box px={[3, 0]}>
          <Heading as="h2" size="lg" color="gray.600" mt={[5, 12]}>
            {user?.username}'s profile
          </Heading>
        </Box>
      )}
      <Posts userId={user?.id} />
    </Container>
  );
}

export default Profile;
