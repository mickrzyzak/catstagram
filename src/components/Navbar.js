import {
  Container,
  Box,
  Button,
  Stack,
  Heading,
  Text,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { AtSignIcon, RepeatIcon } from "@chakra-ui/icons";
import { FaCat } from "react-icons/fa";

function Navbar() {
  const [condensed, setCondensed] = useState(false);

  useEffect(() => {
    const handleScroll = () => setCondensed(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box
      py={condensed ? 2 : [(4, 5)]}
      bgColor="white"
      position="fixed"
      top="0"
      left="0"
      w="100%"
      zIndex="1"
      borderBottom="1px"
      borderColor="red.600"
      borderStyle="dashed"
      boxShadow="base"
    >
      <Container maxW="container.md">
        <Stack direction="row" justifyContent="space-between">
          <Heading fontSize="2xl" as="h1" color="red.600">
            <Icon as={FaCat} color="red.600" mr="2" />
            Cats
            <Text color="gray.600" display="inline">
              tagram
            </Text>
          </Heading>
          <Menu>
            <MenuButton
              as={Button}
              colorScheme="red"
              variant="outline"
              size="sm"
            >
              Your account
            </MenuButton>
            <MenuList>
              <MenuItem icon={<AtSignIcon mb="2px" boxSize="4" />}>
                Go to my profile
              </MenuItem>
              <MenuItem icon={<RepeatIcon mb="2px" boxSize="4" />}>
                Change account
              </MenuItem>
            </MenuList>
          </Menu>
        </Stack>
      </Container>
    </Box>
  );
}

export default Navbar;
