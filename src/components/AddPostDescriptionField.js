import { useContext, useEffect } from "react";
import {
  Textarea,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FormContext } from "./AddPost";

function AddPostDescriptionField() {
  const { formState, formDispatch } = useContext(FormContext);
  const { formValid, description, descriptionValid } = formState;

  const handleDescriptionChange = (e) =>
    formDispatch({ type: "setDescription", payload: e.target.value });

  useEffect(() => {
    formDispatch({
      type: "setDescriptionValid",
      payload: description.length >= 3,
    });
  }, [description, formDispatch]);

  return (
    <FormControl
      isInvalid={!descriptionValid && formValid}
      isRequired={true}
      mb="4"
    >
      <FormLabel>Description</FormLabel>
      <Textarea
        placeholder="Enter post description"
        size="md"
        variant="filled"
        rows="4"
        minLength="3"
        maxLength="1000"
        autoComplete="off"
        value={description}
        onChange={handleDescriptionChange}
      />
      <FormErrorMessage>
        Description is required. Use a minimum of 3 letters.
      </FormErrorMessage>
    </FormControl>
  );
}

export default AddPostDescriptionField;
