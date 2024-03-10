import { useContext, useEffect } from "react";
import {
  Textarea,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FormContext } from "./AddPost";

function DescriptionField() {
  const {
    description,
    setDescription,
    descriptionValid,
    setDescriptionValid,
    formValid,
  } = useContext(FormContext);

  const handleDescriptionChange = (e) => setDescription(e.target.value);

  useEffect(() => {
    setDescriptionValid(description.length >= 3);
  }, [description, setDescriptionValid]);

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
        maxLength="100"
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

export default DescriptionField;
