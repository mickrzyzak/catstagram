import { Container } from "@chakra-ui/react";
import Posts from "./Posts";

function Home() {
  return (
    <Container maxW="container.sm" px={[0, 4]}>
      <Posts />
    </Container>
  );
}

export default Home;
