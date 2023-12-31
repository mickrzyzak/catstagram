import {
  Box,
  CardHeader,
  Heading,
  Text,
  Flex,
  Avatar,
  Button,
  Show,
} from "@chakra-ui/react";
import { AtSignIcon } from "@chakra-ui/icons";
import NavLink from "./NavLink";

function PostHeader({ user }) {
  return (
    <CardHeader px={[3, 5]} py={[3, 4]}>
      <Flex gap="4" alignItems="center">
        <NavLink
          to={`/profile/${user.username}`}
          _hover={{ textDecoration: "none" }}
        >
          <Flex gap="4" alignItems="center" flexWrap="wrap">
            <Avatar
              bg="red.100"
              borderWidth="1px"
              borderColor="red.600"
              name={user.firstName + " " + user.lastName}
              src={user.image}
            />
            <Box>
              <Heading size={["md", "sm"]} color="red.600">
                {user.firstName + " " + user.lastName}
              </Heading>
              <Text fontSize="sm">
                {user.address.city + ", " + user.address.state}
              </Text>
            </Box>
          </Flex>
        </NavLink>
        <Show above="sm">
          <NavLink to={`/profile/${user.username}`} ml="auto">
            <Button
              leftIcon={<AtSignIcon boxSize="4" />}
              colorScheme="red"
              variant="ghost"
              size="sm"
            >
              View profile
            </Button>
          </NavLink>
        </Show>
      </Flex>
    </CardHeader>
  );
}

export default PostHeader;
