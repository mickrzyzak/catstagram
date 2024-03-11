import { useContext } from "react";
import { Button, Text, Divider, Icon, Stack } from "@chakra-ui/react";
import { FiSend } from "react-icons/fi";
import { FormContext } from "./AddPost";
import PhotoField from "./AddPostPhotoField";
import DescriptionField from "./AddPostDescriptionField";
import TagField from "./AddPostTagField";

function AddPostForm({ handlePublish, handleCancel }) {
  const { formState, formDispatch } = useContext(FormContext);
  const { photoValid, descriptionValid, tagsValid } = formState;

  const handleSubmit = () => {
    formDispatch({ type: "setFormValid", payload: true });
    if (photoValid && descriptionValid && tagsValid) {
      handlePublish();
    }
  };

  return (
    <>
      <Text fontSize="lg" as="b">
        Create new post
      </Text>
      <Divider my="3" />
      <PhotoField />
      <DescriptionField />
      <TagField />
      <Stack
        direction={["column-reverse", "row"]}
        justifyContent="flex-end"
        mt="6"
      >
        <Button colorScheme="gray" variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          colorScheme="red"
          variant="outline"
          leftIcon={<Icon boxSize="1.25em" as={FiSend} />}
          onClick={handleSubmit}
        >
          Publish
        </Button>
      </Stack>
    </>
  );
}

export default AddPostForm;
