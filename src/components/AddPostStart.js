import { Box, Text, Icon } from "@chakra-ui/react";
import { MdOutlineAddAPhoto } from "react-icons/md";

function AddPostStart({ handleStart }) {
  return (
    <Box textAlign="center" cursor="pointer" onClick={handleStart}>
      <Icon as={MdOutlineAddAPhoto} boxSize="10" color="red.600" />
      <br />
      <Text
        fontSize="md"
        as="b"
        sx={{ transition: ".2s" }}
        _groupHover={{ color: "red.600" }}
      >
        Create new post
      </Text>
    </Box>
  );
}

export default AddPostStart;
