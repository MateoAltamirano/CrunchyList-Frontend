import { extendTheme } from "@chakra-ui/react";

const Button = {
  // The styles all button have in common
  baseStyle: {
    borderRadius: "base",
    userSelect: "none",
    _focus: {
      boxShadow: "none",
    },
  },
  sizes: {},
  // Two variants: outline and solid
  variants: {
    outline: {
      border: "2px solid",
      borderColor: "orange.400",
      color: "orange.400",
    },
    solid: {
      backgroundColor: "orange.400",
      color: "white",
      _hover: {
        backgroundColor: "orange.500",
      },
      _active: {
        backgroundColor: "orange.400",
      },
    },
  },
  // The default size and variant values
  defaultProps: {
    size: "md",
    variant: "solid",
  },
};

export const theme = extendTheme({
  components: {
    Button,
  },
});
