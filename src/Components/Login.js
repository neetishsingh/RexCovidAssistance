import { useState } from "react";
import {
  Paper,
  Input,
  InputLabel,
  FormControl,
  FormHelperText,
  Grid,
  makeStyles,
  InputAdornment,
  IconButton,
  Typography,
  Button,
  useMediaQuery,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  // is the minimum width 600px false for mobile devides
  const mediaQuery = useMediaQuery("(min-width:600px)");
  const classes = useStyles();
  return (
    <Grid container>
      <Paper
        elevation={5}
        className={mediaQuery ? classes.root_D : classes.root_M}
      >
        <form className={classes.form}>
          <Grid item xs={12}>
            <Typography
              variant="h3"
              className={classes.logo_grid}
              style={{ marginBottom: "3%" }}
            >
              Vendor Login
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControl
              className={mediaQuery ? classes.input_D : classes.input_M}
            >
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                id="email"
                aria-describedby="email-helper"
                type="email"
                onChange={handleChange("email")}
                value={values.email}
                autoComplete="email"
                required
              />
              <FormHelperText id="email-helper">
                Enter your Email
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl
              className={mediaQuery ? classes.input_D : classes.input_M}
            >
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                aria-describedby="password-helper"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                required
                autoComplete="current-password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText id="password-helper">
                Enter your Password
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} className={classes.buttons}>
            <Button color="secondary" type="reset">
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid>
          <Grid item xs={12} className={classes.otherLinks}>
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <Typography variant="subtitle1" color="primary">
                Create an account
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={12} className={classes.otherLinks}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Typography variant="subtitle1" color="secondary">
                Go back
              </Typography>
            </Link>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
}

export default Login;

const useStyles = makeStyles((theme) => ({
  root_D: {
    padding: 20,
    margin: "auto",
    width: "fit-content",
    top: `calc(${window.innerHeight}px*0.2)`,
    position: "relative",
    borderRadius: 15,
  },
  root_M: {
    padding: 20,
    margin: "auto",
    width: "fit-content",
    top: `calc(${window.innerHeight}px*0.25)`,
    position: "relative",
    borderRadius: 15,
  },
  form: {
    width: "100%",
    border: `solid 2px ${theme.palette.primary.dark}`,
    borderRadius: 15,
    padding: 20,
  },
  input_D: {
    margin: "auto",
    display: "flex",
    width: `calc(${window.innerWidth}px*0.50)`,
    justifyContent: "space-arround",
  },
  input_M: {
    margin: "auto",
    display: "flex",
    width: `calc(${window.innerWidth}px*0.70)`,
    justifyContent: "space-arround",
  },
  logo_grid: {
    justifyContent: "center",
    display: "flex",
  },
  buttons: {
    justifyContent: "space-evenly",
    display: "flex",
  },
  otherLinks: {
    justifyContent: "center",
    display: "flex",
  },
}));
