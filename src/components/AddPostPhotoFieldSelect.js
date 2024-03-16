import { Box, Icon, Image, Stack, FormHelperText } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

function AddPostPhotoFieldSelect({ formState, formDispatch }) {
  const { formValid, photo, photoValid } = formState;

  const handlePhotoChange = (photo) =>
    formDispatch({ type: "setPhoto", payload: photo });

  return (
    <>
      <FormHelperText mt="0" mb="2">
        Select a photo
      </FormHelperText>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        {["Cat_1", "Cat_2", "Cat_3"].map((name) => {
          const photoPath = `/img/${name}.jpg`;
          return (
            <Box position="relative" key={name}>
              <Image
                src={photoPath}
                alt={name}
                borderRadius="sm"
                cursor="pointer"
                border="2px solid"
                borderColor={
                  photo === photoPath || (!photoValid && formValid)
                    ? "red.600"
                    : "gray.100"
                }
                onClick={() => handlePhotoChange(photoPath)}
              />
              {photo === photoPath && (
                <Icon as={CheckCircleIcon} variant="image-selected" />
              )}
            </Box>
          );
        })}
      </Stack>
    </>
  );
}

export default AddPostPhotoFieldSelect;
