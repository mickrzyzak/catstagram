import { Box, Icon, Image, Stack, FormHelperText } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import CatPhoto1 from "../assets/Cat_1.jpg";
import CatPhoto2 from "../assets/Cat_2.jpg";
import CatPhoto3 from "../assets/Cat_3.jpg";

const catPhotos = {
  Cat_1: CatPhoto1,
  Cat_2: CatPhoto2,
  Cat_3: CatPhoto3,
};

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
          return (
            <Box position="relative" key={name}>
              <Image
                src={catPhotos[name]}
                alt={name}
                borderRadius="sm"
                cursor="pointer"
                border="2px solid"
                borderColor={
                  photo === catPhotos[name] || (!photoValid && formValid)
                    ? "red.600"
                    : "gray.100"
                }
                onClick={() => handlePhotoChange(catPhotos[name])}
              />
              {photo === catPhotos[name] && (
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
