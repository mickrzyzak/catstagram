import { createContext, useState, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPost, simulateReaction } from "../features/postsSlice";
import { Box } from "@chakra-ui/react";
import formReducer from "../reducers/formReducer";
import Start from "./AddPostStart";
import Form from "./AddPostForm";
import Publishing from "./AddPostPublishing";

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

function AddPost() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const posts = useSelector((state) => state.posts);
  const [status, setStatus] = useState("start");
  const [formState, formDispatch] = useReducer(formReducer, {
    formValid: false,
    photo: null,
    photoValid: false,
    description: "",
    descriptionValid: false,
    tags: tagList,
    tagsValid: false,
  });

  const handleStart = () => setStatus("form");

  const handlePublish = () => {
    setStatus("publishing");
    window.scrollTo(0, 0);
  };

  const handlePublished = () => {
    const postId = (posts.data.filter((post) => post.id <= 0).length + 1) * -1;
    dispatch(
      addPost({
        post: {
          id: postId,
          body: formState.description,
          userId: users.account,
          tags: formState.tags
            .filter((tag) => tag.checked)
            .map((tag) => tag.name),
          reactions: 0,
          comments: [],
        },
        photo: formState.photo,
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
    formDispatch({ type: "reset" });
  };

  return (
    <FormContext.Provider value={{ formState, formDispatch }}>
      <Box
        bg="white"
        boxShadow="base"
        borderRadius={["none", "md"]}
        role="group"
        p={[3, 5]}
        my={[5, 12]}
      >
        {status === "start" && <Start handleStart={handleStart} />}
        {status === "form" && (
          <Form handlePublish={handlePublish} handleCancel={handleCancel} />
        )}
        {status === "publishing" && (
          <Publishing handlePublished={handlePublished} />
        )}
      </Box>
    </FormContext.Provider>
  );
}

export default AddPost;
