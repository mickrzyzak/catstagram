import {
  Box,
  Text,
  Stack,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, removeComment } from "../features/postsSlice";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

function Comments({ postId, comments }) {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const user = users.data.find((user) => user.id === users.account);
  const commentInput = useRef(null);
  const [comment, setComment] = useState("");

  const handleAddComment = (e) => {
    e.preventDefault();
    if (comment.length === 0) return;

    dispatch(
      addComment({
        postId,
        userId: user.id,
        username: user.username,
        content: comment,
      })
    );
    setComment("");
    commentInput.current.blur();
  };

  const handleRemoveComment = (commentId) => {
    dispatch(
      removeComment({
        postId,
        commentId,
      })
    );
  };

  return (
    <Box mt={[4, 5]}>
      <Stack direction="column" spacing="1">
        <Text as="b" color="red.600" fontSize="md">
          Comments
        </Text>
        {comments.map((comment, index) => (
          <Text key={comment.id} fontSize={["sm", "md"]}>
            <Text as="b">{comment.user.username}:</Text> {comment.body}
            {users.account === comment.user.id && (
              <IconButton
                size="xs"
                colorScheme="red"
                variant="ghost"
                ml="1"
                aria-label="Delete comment"
                icon={<DeleteIcon mb="2px" />}
                onClick={() => handleRemoveComment(index)}
              />
            )}
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
            variant="filled"
            minLength="1"
            maxLength="100"
            autoComplete="off"
            id={`comment-input-${postId}`}
            value={comment}
            ref={commentInput}
            onChange={(e) => setComment(e.target.value)}
          />
        </InputGroup>
      </form>
    </Box>
  );
}

export default Comments;
