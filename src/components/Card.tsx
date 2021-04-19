import { Box, useStyleConfig } from "@chakra-ui/react";
import { Props } from "framer-motion/types/types";

const Card = (props: Props) => {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig("Card", { variant });
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
};

export default Card;
