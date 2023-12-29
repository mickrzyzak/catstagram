import {
  Box,
  Text,
  Stack,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../features/postsSlice";
import { EditIcon } from "@chakra-ui/icons";

function Comments({ postId, comments }) {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  const handleAddComment = (e) => {
    e.preventDefault();
    if (comment.length === 0) return;

    dispatch(addComment({ postId, content: comment }));
    setComment("");
  };

  return (
    <Box mt={[4, 5]}>
      <Stack direction="column" spacing="1">
        <Text as="b" color="red.600" fontSize="md">
          Comments
        </Text>
        {comments.map((comment) => (
          <Text key={comment.id} fontSize={["sm", "md"]}>
            <Text as="b">{comment.user.username}:</Text> {comment.body}
          </Text>
        ))}
      </Stack>
      <form onSubmit={handleAddComment}>
        <InputGroup mt="4">
          <InputLeftElement pointerEvents="none">
            <EditIcon color="red.600" />
          </InputLeftElement>
          <Input
            placeholder="Add a comment"
            size="md"
            variant="filled"
            focusBorderColor="red.600"
            minLength="1"
            maxLength="100"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </InputGroup>
      </form>
    </Box>
  );
}

export default Comments;
