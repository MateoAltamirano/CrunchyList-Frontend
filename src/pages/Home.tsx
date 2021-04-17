import { Button, Flex } from "@chakra-ui/react";

const Home = () => {
  return (
    <Flex flexDirection="column">
      Home
      <Button>Crunchy List</Button>
      <Button variant="outline">Crunchy List</Button>
      <Button variant="secondary">Crunchy List</Button>
    </Flex>
  );
};

export default Home;
