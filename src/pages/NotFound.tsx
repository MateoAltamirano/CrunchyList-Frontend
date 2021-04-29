import { Flex, Heading, Text } from "@chakra-ui/layout";
import { BiMessageSquareError } from "react-icons/bi";

const NotFound = () => {
  return (
    <Flex
      h="100%"
      w="100%"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <BiMessageSquareError fontSize="10rem" />
      <Heading size="3xl">Oops!</Heading>

      <Text m="1rem 5rem" fontSize="2xl">
        No pudimos encontrar la página que estas buscando
      </Text>
    </Flex>
  );
};

export default NotFound;
