import { createMuiTheme } from '@material-ui/core/styles';
export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: '#80deea',
      main: '#26c6da',
      dark: '#006064',
      contrastText: '#fff',
    },
    secondary: {
      light: '#dce775',
      main: '#c0ca33',
      dark: '#827717',
      contrastText: '#000',
    },
  },
});