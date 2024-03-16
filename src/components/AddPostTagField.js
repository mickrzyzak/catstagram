import { useContext, useEffect } from "react";
import {
  Checkbox,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FormContext } from "./AddPost";

function AddPostTagField() {
  const { formState, formDispatch } = useContext(FormContext);
  const { formValid, tags, tagsValid } = formState;

  const handleTagsChange = (name) =>
    formDispatch({
      type: "setTags",
      payload: tags.map((tag) =>
        name === tag.name ? { name: tag.name, checked: !tag.checked } : tag
      ),
    });

  useEffect(() => {
    const checkedTags = tags.filter((tag) => tag.checked).length;
    formDispatch({
      type: "setTagsValid",
      payload: checkedTags >= 1 && checkedTags <= 3,
    });
  }, [tags, formDispatch]);

  return (
    <FormControl isInvalid={!tagsValid && formValid} isRequired={true} mb="4">
      <FormLabel as="legend">Tags</FormLabel>
      <Stack direction="row" flexWrap="wrap">
        {tags.map(({ name, checked }) => (
          <Checkbox
            value={name}
            id={name}
            key={name}
            autoComplete="off"
            colorScheme="red"
            isDisabled={
              tags.filter((tag) => tag.checked).length === 3 && !checked
            }
            isChecked={checked}
            onChange={() => handleTagsChange(name)}
          >
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </Checkbox>
        ))}
      </Stack>
      <FormErrorMessage>
        Tags are required. Select between 1 and 3.
      </FormErrorMessage>
    </FormControl>
  );
}

export default AddPostTagField;
