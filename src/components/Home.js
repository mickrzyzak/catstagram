import { Container } from "@chakra-ui/react";
import AddPost from "./AddPost";
import Posts from "./Posts";

function Home() {
  return (
    <Container maxW="container.sm" px={[0, 4]}>
      <AddPost />
      <Posts />
    </Container>
  );
}

export default Home;
