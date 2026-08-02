import type { ThemeOptions } from "@mui/material/styles";

/** Our default theme options for Material UI styling. */
const defaultThemeOptions: ThemeOptions = {
  cssVariables: {
    colorSchemeSelector: "class",
  },
  colorSchemes: {
    dark: true,
    light: true,
  },
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          textTransform: "none ! important",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => {
          return {
            border: 1,
            borderStyle: "solid",
            borderColor: theme.vars.palette.divider,
          };
        },
      },
    },
  },
};

export default defaultThemeOptions;
