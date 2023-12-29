import {
  Box,
  Card,
  CardHeader,
  CardBody,
  Image,
  Heading,
  Text,
  Flex,
  Avatar,
  Stack,
  Button,
  Icon,
  Divider,
  SkeletonText,
  Badge,
  Show,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addReaction, removeReaction } from "../features/postsSlice";
import { AtSignIcon, ChatIcon } from "@chakra-ui/icons";
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

function Header({ user }) {
  return (
    <CardHeader px={[3, 5]}>
      <Flex gap="4" alignItems="center">
        <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
          <Avatar
            bg="red.100"
            borderWidth="1px"
            borderColor="red.600"
            name={user.firstName + " " + user.lastName}
            src={user.image}
          />
          <Box>
            <Heading size={["md", "sm"]} color="red.600">
              {user.firstName + " " + user.lastName}
            </Heading>
            <Text fontSize="sm">
              {user.address.city + ", " + user.address.state}
            </Text>
          </Box>
        </Flex>
        <Show above="sm">
          <Button
            leftIcon={<AtSignIcon />}
            colorScheme="red"
            variant="outline"
            size="sm"
          >
            View profile
          </Button>
        </Show>
      </Flex>
    </CardHeader>
  );
}

function Body({ post }) {
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
        src="https://cdn2.thecatapi.com/images/MTgwMTIzMA.jpg"
        alt="Cute Kitty"
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

function Post({ post, user }) {
  if (!post || !user)
    return <SkeletonText noOfLines={5} spacing="4" skeletonHeight="2" />;

  return (
    <Card variant="elevated" boxShadow="md">
      <Header user={user} />
      <Divider color="red.600" variant="dashed" />
      <Body post={post} />
    </Card>
  );
}

export default Post;