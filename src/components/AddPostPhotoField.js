import { useContext, useEffect } from "react";
import {
  Box,
  Icon,
  Image,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { FormContext } from "./AddPost";

function PhotoField() {
  const { photo, setPhoto, photoValid, setPhotoValid, formValid } =
    useContext(FormContext);

  const handlePhotoClick = (photo) => setPhoto(photo);

  useEffect(() => {
    setPhotoValid(photo !== null);
  }, [photo, setPhotoValid]);

  return (
    <FormControl isInvalid={!photoValid && formValid} isRequired={true} mb="4">
      <FormLabel as="legend">Photo</FormLabel>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        {["Cat_1", "Cat_2", "Cat_3"].map((name) => (
          <Box position="relative" key={name}>
            <Image
              src={`/img/${name}.jpg`}
              alt={name}
              borderRadius="sm"
              cursor="pointer"
              draggable="false"
              borderWidth="2px"
              borderStyle="solid"
              borderColor={
                photo === name || (!photoValid && formValid)
                  ? "red.600"
                  : "gray.100"
              }
              onClick={() => handlePhotoClick(name)}
            />
            {photo === name && (
              <Icon
                as={CheckCircleIcon}
                position="absolute"
                top={[".25rem", ".5rem"]}
                left={[".25rem", ".5rem"]}
                backgroundColor="gray.100"
                borderRadius="full"
                border="1px solid"
                borderColor="gray.100"
                color="red.600"
              />
            )}
          </Box>
        ))}
      </Stack>
      <FormErrorMessage>Photo is required. Select a photo.</FormErrorMessage>
    </FormControl>
  );
}

export default PhotoField;
