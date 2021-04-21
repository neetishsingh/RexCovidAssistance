import { ThemeProvider, CssBaseline } from "@material-ui/core";
import LightTheme from "./Theme/LightTheme";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Topbar from "./Components/Appbar";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import HomeView from "./Components/HomeView";
import Datatable from "./Components/Datatable";
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
          <Topbar>
            <Route path="/">
              <HomeView/>
              <Datatable/>
            </Route>
          </Topbar>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
