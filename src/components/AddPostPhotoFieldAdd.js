import { useRef } from "react";
import { Button, Image, Input, Stack, FormHelperText } from "@chakra-ui/react";
import FileInputWrapper from "./FileInputWrapper";

function AddPostPhotoFieldAdd({
  formState,
  formDispatch,
  preview,
  setPreview,
}) {
  const { photo } = formState;
  const fileInput = useRef(null);

  const handlePhotoChange = (e) => {
    // Create a blob
    formDispatch({
      type: "setPhoto",
      payload: URL.createObjectURL(e.target.files[0]),
    });
    fileInput.current.value = "";
    setPreview(true);
  };

  const handlePreviewCancel = () => {
    formDispatch({
      type: "setPhoto",
      payload: null,
    });
    setPreview(false);
  };

  return (
    <>
      {preview && (
        <>
          <Image
            src={photo}
            alt="photo-preview"
            w="100%"
            maxH="50vh"
            objectFit="cover"
            borderRadius="sm"
          />
          <Stack direction={["column", "row"]} justifyContent="flex-end" mt="2">
            <Button
              colorScheme="red"
              size="sm"
              variant="outline"
              onClick={handlePreviewCancel}
            >
              Cancel
            </Button>
          </Stack>
        </>
      )}
      {!preview && (
        <>
          <FormHelperText mt="0" mb="2">
            Add your own
          </FormHelperText>
          <FileInputWrapper>
            <Input
              variant="filled"
              type="file"
              accept="image/png, image/gif, image/jpeg"
              cursor="pointer"
              ref={fileInput}
              onChange={(e) => handlePhotoChange(e)}
            />
          </FileInputWrapper>
        </>
      )}
    </>
  );
}

export default AddPostPhotoFieldAdd;
