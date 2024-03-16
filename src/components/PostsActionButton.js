import { Button } from "@chakra-ui/react";

function PostsActionButton({ children, action, loading }) {
  return (
    <Button
      colorScheme="red"
      size="md"
      w="100%"
      variant="outline"
      bgColor="white"
      boxShadow="base"
      loadingText="Loading"
      spinnerPlacement="start"
      isLoading={loading}
      onClick={action}
    >
      {children}
    </Button>
  );
}

export default PostsActionButton;
