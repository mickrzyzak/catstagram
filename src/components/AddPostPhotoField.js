import { useContext, useState, useEffect } from "react";
import {
  AbsoluteCenter,
  Box,
  Divider,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FormContext } from "./AddPost";
import Select from "./AddPostPhotoFieldSelect";
import Add from "./AddPostPhotoFieldAdd";

function AddPostPhotoField() {
  const { formState, formDispatch } = useContext(FormContext);
  const { formValid, photo, photoValid } = formState;
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    formDispatch({ type: "setPhotoValid", payload: photo !== null });
  }, [photo, formDispatch]);

  return (
    <FormControl isInvalid={!photoValid && formValid} isRequired={true} mb="4">
      <FormLabel as="legend">Photo</FormLabel>
      {!preview && (
        <>
          <Select formState={formState} formDispatch={formDispatch} />
          <Box position="relative" my={[5, 7]}>
            <Divider />
            <AbsoluteCenter bg="white" color="gray.600" px="4">
              OR
            </AbsoluteCenter>
          </Box>
        </>
      )}
      <Add
        formState={formState}
        formDispatch={formDispatch}
        preview={preview}
        setPreview={setPreview}
      />
      <FormErrorMessage>
        Photo is required. Select a photo or add your own.
      </FormErrorMessage>
    </FormControl>
  );
}

export default AddPostPhotoField;
