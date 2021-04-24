import { useEffect, useState } from "react";
import { ThemeProvider, CssBaseline, makeStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import LightTheme from "./Theme/LightTheme";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import HomeView from "./Components/HomeView";
import Detectlocation from "./Components/Detectlocation";
import Datatable from "./Components/Datatable";
import UserDashboard from "./Components/UserDashboard";
import TopBar from "./Components/Appbar";
import Axios from "axios";
import Backdrop from '@material-ui/core/Backdrop';
import { useStateContext } from "./Context/ContextProvider";
function App() {
  const [{ Backend, availableCentres }, dispatch] = useStateContext();
  const getUser = async (refreshToken) => {
    let user = await Axios.post(`${Backend}/getUser`, { token: refreshToken });
    return user.data;
  };
  const classes = useStyles();
  useEffect(() => {
    if (localStorage.getItem("RexCovid-refreshToken")) {
      // If the user has previously logged in using this browser
      let refreshToken = localStorage.getItem("RexCovid-refreshToken");
      getUser(refreshToken)
        .then((response) => {
          dispatch({
            type: "ADD_USER",
            data: response.user,
          });
          console.log("Got user", response);
        })
        .catch((err) => {
          console.log("From local Storage", refreshToken);
          console.log("Error occoured while fetching user", err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    if (availableCentres !== undefined) {
      //Setting Loader off for homeScreen
      setLoading(false);
    }
  }, [availableCentres]);
  return (
    <ThemeProvider theme={LightTheme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/dashboard">
            <TopBar>
              <UserDashboard>
                <Detectlocation where="vendor" />
              </UserDashboard>
            </TopBar>
          </Route>
          <Route path="/">
            <TopBar>
              <HomeView>
                <Detectlocation where="user" />
              </HomeView>
              {Loading ? (
                <Backdrop className={classes.backdrop} open={Loading}>
                  <CircularProgress  />
                </Backdrop>
              ) : (
                <Datatable />
              )}
            </TopBar>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;

const useStyles = makeStyles((theme) => ({
  // progress: {
  //   marginLeft: `calc(${window.innerWidth}px*0.45)`,
  //   [theme.breakpoints.up("sm")]: {
  //     marginLeft: `calc(${window.innerWidth}px*0.48)`,
  //   },
  // },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
