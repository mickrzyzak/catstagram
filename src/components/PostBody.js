import {
  AspectRatio,
  CardBody,
  Image,
  Text,
  Stack,
  Button,
  Icon,
  Skeleton,
  Badge,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addReaction, removeReaction } from "../features/postsSlice";
import { ChatIcon } from "@chakra-ui/icons";
import { TbCat } from "react-icons/tb";
import Comments from "./Comments";

function randomBadgeColor() {
  const colors = [
    "red",
    "orange",
    "yellow",
    "green",
    "teal",
    "blue",
    "cyan",
    "purple",
    "pink",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

function PostBody({ post, photo }) {
  const dispatch = useDispatch();
  const [excerpt, setExcerpt] = useState(true);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [badgeColors, setBadgeColors] = useState([]);

  const handleReaction = () => {
    if (post.reacted) {
      dispatch(removeReaction(post.id));
    } else {
      dispatch(addReaction(post.id));
    }
  };

  const handleComments = () => {
    setCommentsOpen(!commentsOpen);
  };

  useEffect(() => {
    setBadgeColors(post.tags.map(() => randomBadgeColor()));
  }, [post.tags]);

  return (
    <CardBody px={[3, 5]}>
      <Image
        w="100%"
        maxH="50vh"
        minH="300px"
        objectFit="cover"
        fallback={
          <AspectRatio ratio={16 / 9}>
            <Skeleton />
          </AspectRatio>
        }
        src={photo.url}
        alt={photo.id}
      />
      <Stack direction="row" wrap="wrap" mt={[4, 5]}>
        {post.tags.map((tag, index) => (
          <Badge variant="outline" colorScheme={badgeColors[index]} key={index}>
            {tag}
          </Badge>
        ))}
      </Stack>
      <Text
        mt="3"
        fontSize="md"
        noOfLines={excerpt ? 3 : 0}
        onClick={() => setExcerpt(false)}
      >
        {post.body}
      </Text>
      <Stack
        spacing={2}
        justifyContent={["center", "flex-start"]}
        direction={["center", "flex-start"]}
        mt={[4, 5]}
      >
        <Button
          leftIcon={<Icon mb="0.5" boxSize="1.25em" as={TbCat} />}
          colorScheme={post.reacted ? "red" : "gray"}
          variant="outline"
          flex={[1, "none"]}
          isActive={true}
          onClick={handleReaction}
        >
          {post.reactions}
        </Button>
        <Button
          leftIcon={<ChatIcon mb="0.5" />}
          colorScheme={commentsOpen ? "red" : "gray"}
          variant="outline"
          flex={[1, "none"]}
          isActive={true}
          onClick={handleComments}
        >
          {post.comments ? post.comments.length : 0}
        </Button>
      </Stack>
      {commentsOpen && post.comments && (
        <Comments postId={post.id} comments={post.comments} />
      )}
    </CardBody>
  );
}

export default PostBody;
