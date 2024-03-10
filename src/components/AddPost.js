import { createContext, useContext, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPost, simulateReaction } from "../features/postsSlice";
import {
  Box,
  Button,
  Text,
  Divider,
  Icon,
  Stack,
  Progress,
} from "@chakra-ui/react";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { FiSend } from "react-icons/fi";
import PhotoField from "./AddPostPhotoField";
import DescriptionField from "./AddPostDescriptionField";
import TagField from "./AddPostTagField";

export const FormContext = createContext(null);

const tagList = [
  { name: "love", checked: false },
  { name: "beautiful", checked: false },
  { name: "happy", checked: false },
  { name: "cute", checked: false },
  { name: "selfie", checked: false },
  { name: "meow", checked: false },
  { name: "follow", checked: false },
];

function AddPostButton({ handleStart }) {
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

function AddPostForm({ handlePublish, handleCancel }) {
  const { setFormValid, photoValid, descriptionValid, tagsValid } =
    useContext(FormContext);

  const handleSubmit = () => {
    setFormValid(true);
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

function AddPostPublishing({ handlePublished }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((progress) => progress + 10);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) setTimeout(() => handlePublished(), 1500);
  }, [progress, handlePublished]);

  return (
    <Box textAlign="center">
      <Text fontSize="md" as="b">
        Publishing...
      </Text>
      <Progress
        colorScheme="red"
        size="md"
        mt="2"
        hasStripe={true}
        isAnimated={true}
        value={progress}
        sx={{ "& > div": { transition: ".3s" } }}
      />
    </Box>
  );
}

function AddPost() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const posts = useSelector((state) => state.posts);
  const [status, setStatus] = useState("start");
  const [formValid, setFormValid] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [photoValid, setPhotoValid] = useState(false);
  const [description, setDescription] = useState("");
  const [descriptionValid, setDescriptionValid] = useState(false);
  const [tags, setTags] = useState(tagList);
  const [tagsValid, setTagsValid] = useState(false);

  const formContextData = {
    formValid,
    setFormValid,
    photo,
    setPhoto,
    photoValid,
    setPhotoValid,
    description,
    setDescription,
    descriptionValid,
    setDescriptionValid,
    tags,
    setTags,
    tagsValid,
    setTagsValid,
  };

  const handleStart = () => setStatus("form");

  const handlePublish = () => {
    setStatus("publishing");
    window.scrollTo(0, 0);
  };

  const handlePublished = () => {
    const postId = (posts.data.filter((post) => post.id <= 0).length + 1) * -1;
    dispatch(
      addPost({
        id: postId,
        body: description,
        userId: users.account,
        tags: tags.filter((tag) => tag.checked).map((tag) => tag.name),
        reactions: 0,
        comments: [],
        photo,
      })
    );
    // Simulate 5 to 20 reactions in 30 seconds
    for (let i = 0; i < Math.floor(Math.random() * 15 + 5); i++) {
      setTimeout(() => {
        dispatch(simulateReaction(postId));
      }, Math.floor(Math.random() * 30000));
    }
    resetForm();
    setStatus("start");
  };

  const handleCancel = () => {
    resetForm();
    setStatus("start");
  };

  const resetForm = () => {
    setFormValid(false);
    setPhoto(null);
    setDescription("");
    setTags(
      tags.map((tag) => {
        return { name: tag.name, checked: false };
      })
    );
  };

  return (
    <FormContext.Provider value={formContextData}>
      <Box
        bg="white"
        boxShadow="base"
        borderRadius={["none", "md"]}
        role="group"
        p={[3, 5]}
        my={[5, 12]}
      >
        {status === "start" && <AddPostButton handleStart={handleStart} />}
        {status === "form" && (
          <AddPostForm
            handlePublish={handlePublish}
            handleCancel={handleCancel}
          />
        )}
        {status === "publishing" && (
          <AddPostPublishing handlePublished={handlePublished} />
        )}
      </Box>
    </FormContext.Provider>
  );
}

export default AddPost;
