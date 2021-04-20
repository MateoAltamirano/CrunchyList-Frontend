import { Box } from "@chakra-ui/layout";
import { useRadio } from "@chakra-ui/radio";
import { Props } from "framer-motion/types/types";

const RadioButton = (props: Props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        userSelect="none"
        _checked={{
          bg: "primary.main",
          color: "white",
        }}
        px={5}
        py={3}
        m={"0 0.5rem"}
      >
        {props.children}
      </Box>
    </Box>
  );
};

export default RadioButton;
