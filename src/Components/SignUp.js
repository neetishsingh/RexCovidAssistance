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
import {Link} from "react-router-dom";
import SendIcon from "@material-ui/icons/Send";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
function Signup() {
  const classes = useStyles();
  // is the minimum width 600px false for mobile devides
  const mediaQuery = useMediaQuery("(min-width:600px)");
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    verfpass: "",
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
              id="logo-font"
              className={classes.logo_grid}
              style={{ marginBottom: "3%" }}
            >
              Vendor Sign-up
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControl
              className={mediaQuery ? classes.input_D : classes.input_M}
            >
              <InputLabel htmlFor="email" color="secondary">
                Email
              </InputLabel>
              <Input
                id="email"
                aria-describedby="email-helper"
                type="email"
                onChange={handleChange("email")}
                autoComplete="email"
                required
                color="secondary"
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
              <InputLabel htmlFor="name" color="secondary">
                Name / Agency Name
              </InputLabel>
              <Input
                id="name"
                aria-describedby="name-helper"
                type="text"
                onChange={handleChange("name")}
                autoComplete="name"
                required
                color="secondary"
              />
              <FormHelperText id="name-helper">Enter your Name or your Agency's Name</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl
              className={mediaQuery ? classes.input_D : classes.input_M}
            >
              <InputLabel htmlFor="password" color="secondary">
                Password
              </InputLabel>
              <Input
                id="password"
                aria-describedby="password-helper"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                required
                color="secondary"
                autoComplete="new-password"
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
          <Grid item xs={12}>
            <FormControl
              className={mediaQuery ? classes.input_D : classes.input_M}
            >
              <InputLabel htmlFor="Verfpassword" color="secondary">
                Verify Password
              </InputLabel>
              <Input
                id="password"
                aria-describedby="Verfpassword-helper"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("verfpass")}
                required
                color="secondary"
                autoComplete="new-password"
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
              <FormHelperText id="Verfpassword-helper">
                Verify your Password
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} className={classes.buttons}>
            <Button color="primary" type="reset">
              Cancel
            </Button>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              endIcon={<SendIcon />}
            >
              Submit
            </Button>
          </Grid>
          <Grid item xs={12} className={classes.otherLinks}>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Typography variant="subtitle1" color="primary">
                Existing User Sign in
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

export default Signup;
const useStyles = makeStyles((theme) => ({
  root_D: {
    padding: 20,
    margin: "auto",
    width: "fit-content",
    top: `calc(${window.innerHeight}px*0.1)`,
    position: "relative",
    borderRadius: 15,
  },
  root_M: {
    padding: 20,
    margin: "auto",
    width: "fit-content",
    top: `calc(${window.innerHeight}px*0.2)`,
    position: "relative",
    borderRadius: 15,
  },
  form: {
    width: "100%",
    border: `solid 2px ${theme.palette.secondary.dark}`,
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
