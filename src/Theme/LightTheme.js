import { createMuiTheme } from "@material-ui/core";
import {green} from "@material-ui/core/colors";
const LightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      // main: "#4eff95"
      main: green["A400"],
    },
    secondary: {
      main: "#e6006f",
    },
  },
});
export default LightTheme;
