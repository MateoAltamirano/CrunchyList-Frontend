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
      borderColor: "primary.main",
      color: "primary.main",
    },
    solid: {
      backgroundColor: "primary.main",
      color: "white",
      _hover: {
        backgroundColor: "primary.dark",
      },
      _active: {
        backgroundColor: "primary.main",
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
  colors: {
    primary: {
      main: "#f37623",
      light: "#ffa753",
      dark: "#ba4700",
    },
    secondary: {
      main: "#19bcbe",
      light: "#65eff1",
      dark: "#008b8e",
    },
  },
  components: {
    Button,
  },
});
