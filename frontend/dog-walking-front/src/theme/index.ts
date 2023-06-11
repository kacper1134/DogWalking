import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { colors } from "./colors/colors";
import textStyles from "./textStyles/textStyles";

const config: ThemeConfig = {
  initialColorMode: "dark"
}

const theme = extendTheme({
  config,
  colors: colors,
  textStyles: textStyles,
});

export default theme;
