import {useEffect} from "react";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
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
import {useStateContext} from "./Context/ContextProvider";
function App() {
  const [{Backend},dispatch] = useStateContext();
  const getUser = async(refreshToken) =>{
    let user = await Axios.post(`${Backend}/getUser`,{token:refreshToken});
    return user.data;
  }
  useEffect(()=>{
    if( localStorage.getItem('RexCovid-refreshToken')!==null)
    {
      // If the user has previously logged in using this browser
      let refreshToken = localStorage.getItem('RexCovid-refreshToken');
      getUser(refreshToken).then((response)=>{
        dispatch({
          type: "ADD_USER",
          data: response.user,
        });
        console.log("Got user",response);
      }).catch((err)=>{
        console.log("From local Storage",refreshToken);
        console.log("Error occoured while fetching user", err);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
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
            <UserDashboard>
              <Detectlocation where="vendor" />
            </UserDashboard>
          </Route>
          <Route path="/">
            <TopBar>
              <HomeView>
                <Detectlocation where="user" />
              </HomeView>
              <Datatable />
            </TopBar>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
