import { extendTheme } from "@chakra-ui/react";

//Styles for normal component
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
  // 3 variants: primary, secondary, outline
  variants: {
    primary: {
      backgroundColor: "primary.main",
      color: "white",
      _hover: {
        backgroundColor: "primary.dark",
      },
      _active: {
        backgroundColor: "primary.main",
      },
    },
    secondary: {
      backgroundColor: "secondary.main",
      color: "white",
      _hover: {
        backgroundColor: "secondary.dark",
      },
      _active: {
        backgroundColor: "secondary.main",
      },
    },
    outline: {
      border: "2px solid",
      borderColor: "primary.main",
      color: "primary.main",
    },
  },
  // The default size and variant values
  defaultProps: {
    size: "md",
    variant: "primary",
  },
};

const Link = {
  baseStyle: {
    userSelect: "none",
    _focus: {
      boxShadow: "none",
    },
  },
};
const Input={
    // The parts of the component
    parts: ["field", "addon"],
    // The base styles for each part
    baseStyle: {
      field:{
        backgroundColor:"#FF0000"
      },
      addon:{

      }
    },
    // The size styles for each part
    sizes: {},
    // The variant styles for each part
    variants: {
      primary:{
        field:{
          backgroundColor:"white",
          marginTop:"10px",
          marginBottom:"10px",
          
          _focus:{
            border:"2px solid #19bcbe",
          },
          _placeholder:{
            color:"black",
          }
        }
      }
    },
    // The default `size` or `variant` values
    defaultProps: {
      variant: "primary"
    },
}

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
    white: "#FFFFFF"
  },
  components: {
    Button,
    Link,
    Input
  },
});
