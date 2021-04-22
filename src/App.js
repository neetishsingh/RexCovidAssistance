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
function App() {

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
          <Route path="/dashboard/:userEmail" component={UserDashboard}/>
          <Route path="/">
            <TopBar>
              <HomeView>
                <Detectlocation />
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
