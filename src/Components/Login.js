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
import Visibility from "@material-ui/icons/Visibility";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Axios from "axios";
import { useStateContext } from "../Context/ContextProvider";
function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const [ShowLoader, setShowLoader] = useState(false);
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const [{ user, Backend }, dispatch] = useStateContext();
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const history = useHistory();
  // is the minimum width 600px false for mobile devides
  const mediaQuery = useMediaQuery("(min-width:600px)");
  const classes = useStyles();
  const Reset = (e) => {
    e.preventDefault();
    setValues({
      email: "",
      password: "",
      showPassword: false,
    });
  };
  const startSession = async (document) => {
    let response = await Axios.post(`${Backend}/login`, document);
    console.log(response.data);
    return response.data;
  };
  const Signin = (e) => {
    e.preventDefault();
    setShowLoader(true);
    let document = { Email: values.email, Password: values.password };
    startSession(document)
      .then((response) => {
        if (response.m === "Authenticed user") {
          dispatch({
            type: "ADD_USER",
            data: response.user,
          });
          localStorage.setItem("RexCovid-refreshToken", response.user.refresh);
          setShowLoader(false);
          history.push(`/dashboard?user=${response.user.Email}`);
        } else if (response.m === "Wrong Password") {
          setShowLoader(false);
          alert("Email or Password Wrong");
        } else if (response.m === "Single User Multiple Session") {
          setShowLoader(false);
          alert(
            "You alrady have logged in"
          );
        } else {
          console.log("User not set", user);
          setShowLoader(false);
          alert(
            "You alrady have logged in through one device signout from that first \n Or User doesn't exist"
          );
        }
      })
      .catch((err) => {
        console.log("Error occoured", err);
      });
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
              <Grid item xs={12} className={classes.buttons}>
                <Button color="secondary" type="reset" onClick={Reset}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={Signin}
                >
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
      )}
    </Fragment>
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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
