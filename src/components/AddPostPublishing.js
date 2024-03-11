import { useState, useEffect } from "react";
import { Box, Text, Progress } from "@chakra-ui/react";

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

export default AddPostPublishing;
