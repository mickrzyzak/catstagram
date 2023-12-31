import {
  AspectRatio,
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
  Skeleton,
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
    <CardHeader px={[3, 5]} py={[3, 4]}>
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
            leftIcon={<AtSignIcon boxSize="4" />}
            colorScheme="red"
            variant="ghost"
            size="sm"
          >
            View profile
          </Button>
        </Show>
      </Flex>
    </CardHeader>
  );
}

function Body({ post, photo }) {
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

function Post({ post, user, photo }) {
  if (!post || !user || !photo)
    return <SkeletonText noOfLines={5} spacing="4" skeletonHeight="2" />;

  return (
    <Card variant="elevated" boxShadow="base">
      <Header user={user} />
      <Divider color="red.600" variant="dashed" />
      <Body post={post} photo={photo} />
    </Card>
  );
}

export default Post;
