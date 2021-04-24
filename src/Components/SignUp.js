import { useState, Fragment } from "react";
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
import { Link, useHistory } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import SendIcon from "@material-ui/icons/Send";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Axios from "axios";
import { useStateContext } from "../Context/ContextProvider";
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
  const [ShowLoader, setShowLoader] = useState(false);
  const history = useHistory();
  const [{ Backend }, dispatch] = useStateContext();
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const Reset = (e) => {
    e.preventDefault();
    setValues({
      name: "",
      email: "",
      password: "",
      verfpass: "",
      showPassword: false,
    });
  };
  const SignUp = async (e) => {
    e.preventDefault();
    setShowLoader(true);
    if (values.password === values.verfpass) {
      let document = {
        Name: values.name,
        Email: values.email,
        Password: values.password,
      };
      let response = await Axios.post(`${Backend}/signup`, document);
      console.log(response.data);
      dispatch({
        type: "ADD_USER",
        data: response.data.user,
      });
      localStorage.setItem("RexCovid-refreshToken", response.data.user.refresh);
      setShowLoader(false);
      history.push(`/dashboard?user=${response.data.user.Email}`);
    } else {
      alert("Password doesn't Match");
      return -1;
    }
  };
  return (
    <Fragment>
      {ShowLoader ? (
        <Backdrop className={classes.backdrop} open={ShowLoader}>
          <CircularProgress color="secondary" />
        </Backdrop>
      ) : (
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
                  style={{ marginBottom: "3%", textAlign: "center" }}
                >
                  Vendor
                  <br />
                  Sign-up
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
                    value={values.email}
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
                    value={values.name}
                    autoComplete="name"
                    required
                    color="secondary"
                  />
                  <FormHelperText id="name-helper">
                    Enter your Name or your Agency's Name
                  </FormHelperText>
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
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {values.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
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
                    id="Verifypassword"
                    aria-describedby="Verfpassword-helper"
                    type={values.showPassword ? "text" : "password"}
                    value={values.verfpass}
                    onChange={handleChange("verfpass")}
                    required
                    color="secondary"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {values.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
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
                <Button color="primary" type="reset" onClick={Reset}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  onClick={SignUp}
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
      )}
    </Fragment>
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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));
