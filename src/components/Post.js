import { Card, Divider, SkeletonText } from "@chakra-ui/react";
import PostHeader from "./PostHeader";
import PostBody from "./PostBody";

function Post({ post, user, photo }) {
  if (!post || !user || !photo)
    return (
      <SkeletonText noOfLines={5} spacing="4" skeletonHeight="2" mx={[3, 0]} />
    );

  return (
    <Card variant="elevated" boxShadow="base" borderRadius={["none", "md"]}>
      <PostHeader user={user} />
      <Divider color="red.600" variant="dashed" />
      <PostBody post={post} photo={photo} />
    </Card>
  );
}

export default Post;
