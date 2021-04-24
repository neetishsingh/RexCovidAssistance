import { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { fade, makeStyles } from "@material-ui/core/styles";
import { Typography, useTheme } from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import SearchIcon from "@material-ui/icons/Search";
import SortIcon from "@material-ui/icons/Sort";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { deepPurple, grey } from "@material-ui/core/colors";
import DashboardIcon from "@material-ui/icons/Dashboard";
import Axios from "axios";
import { Link } from "react-router-dom";
import { useStateContext } from "../Context/ContextProvider";
function HomeView({ children }) {
  const classes = useStyles();
  const theme = useTheme();
  // is the minimum width 600px false for mobile devides
  const mediaQuery = useMediaQuery("(min-width:600px)");
  const [searchRadius, setSearchRadius] = useState("");
  const [{ Userlocation, Backend, user }, dispatch] = useStateContext();
  const [resultInfo, setResultInfo] = useState({
    TotalResults: "",
    searchRadius: 0,
  });
  const searchDB = async () => {
    if (Userlocation !== undefined) {
      let response = await Axios.post(`${Backend}/centres`, {
        MyLocation: Userlocation,
        Radius: searchRadius !== "" ? searchRadius : 2,
      });
      if (response.data.m === "success") {
        console.log("success returning", response.data);
        dispatch({
          type: "CENTRES_FOUND",
          data: response.data.centresFound,
        });
        setResultInfo({
          TotalResults: response.data.TotalResults,
          searchRadius: response.data.searchRadius,
        });
        return response.data;
      } else {
        console.log("error");
      }
    } else {
      console.log("Detecting Location Wait for Sometime...");
    }
  };
  const customSearch = (e) => {
    e.preventDefault();
    searchDB();
  };
  const automatedSearch = () => {
    searchDB()
      .then((resp) => {
        console.log("response came here", resp);
      })
      .catch((err) => {
        console.log("Error in fetching cards", err);
      });
  };
  useEffect(() => {
    if (Userlocation !== undefined) {
      setTimeout(automatedSearch, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Userlocation]);

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        lg={12}
        style={{
          justifyContent: "center",
          display: "flex",
          marginBottom: theme.spacing(1),
        }}
      >
        {user !== undefined ? (
          <Link
            to={`/dashboard?user=${user.Email}`}
            style={{ textDecoration: "none" }}
          >
            <Button
              variant="contained"
              style={{ backgroundColor: deepPurple[500], color: "#ffffff" }}
              endIcon={<DashboardIcon />}
            >
              Your Dashboard
            </Button>
          </Link>
        ) : null}
      </Grid>
      <form className={mediaQuery ? classes.form_D : classes.form_M}>
        <Grid item xs={12} lg={10}>
          <Paper elevation={3}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search Radius in Km"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                value={searchRadius}
                onChange={(event) => setSearchRadius(event.target.value)}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          lg={2}
          className={mediaQuery ? null : classes.Button_M}
          style={mediaQuery ? { marginLeft: theme.spacing(1) } : null}
        >
          {children}
        </Grid>
      </form>
      <Grid item xs={12} className={classes.Button_M}>
        <Button
          variant="contained"
          color="secondary"
          //style={mediaQuery ? { marginLeft: theme.spacing(1) } : null}
          startIcon={<SearchIcon />}
          type="submit"
          onClick={customSearch}
        >
          Search
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="h6"
          style={{ display: "inline-flex", color: grey[500] }}
        >
          Results
        </Typography>
        <SortIcon
          style={{
            margin: theme.spacing(1),
            verticalAlign: "middle",
            fontSize: 35,
            color: grey[500],
          }}
        />
      </Grid>
      {resultInfo.TotalResults !== "" && resultInfo.searchRadius !== "" ? (
        <Grid item xs={12}>
          <Typography
            variant="body1"
            style={{ display: "inline-flex", color: grey[800] }}
          >
            Centres Found: {resultInfo.TotalResults}
            &nbsp;&nbsp;&nbsp;&nbsp;Search Raduis: {resultInfo.searchRadius} km
          </Typography>
        </Grid>
      ) : (
        <Grid item xs={12}>
          <Typography
            variant="body1"
            style={{ display: "inline-flex", color: grey[800] }}
          >
            Centres Found: 0 &nbsp;&nbsp;&nbsp;&nbsp;Search Raduis:
            {resultInfo.searchRadius} km
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}

export default HomeView;

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "inherit",
  },
  form_D: {
    width: "100%",
    display: "flex",
  },
  form_M: {
    width: "100%",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: `calc(${window.innerWidth}px*0.78)`,
  },
  search_D: {
    marginLeft: theme.spacing(1),
  },
  Button_M: {
    margin: theme.spacing(1),
    justifyContent: "center",
    display: "flex",
  },
}));
