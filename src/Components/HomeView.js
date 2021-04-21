import Grid from "@material-ui/core/Grid";
import { fade, makeStyles } from "@material-ui/core/styles";
import { Typography, useTheme } from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import SearchIcon from "@material-ui/icons/Search";
import SortIcon from '@material-ui/icons/Sort';
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Detectlocation from "./Detectlocation";
import {grey} from "@material-ui/core/colors";
function HomeView() {
  const classes = useStyles();
  const theme = useTheme();
  // is the minimum width 600px false for mobile devides
  const mediaQuery = useMediaQuery("(min-width:600px)");
  return (
    
      <Grid container>
        <Grid item xs={12} lg={11}>
          <Paper elevation={3}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search Location"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          lg={1}
          className={mediaQuery ? null : classes.Button_M}
        >
          <Button
            variant="contained"
            color="secondary"
            style={mediaQuery ? { marginLeft: theme.spacing(1) } : null}
            startIcon={<SearchIcon />}
          >
            Search
          </Button>
        </Grid>
        <Grid item xs={12} className={classes.Button_M}>
          <Detectlocation/>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" style={{display:"inline-flex", color: grey[500]}}>Results</Typography>
          <SortIcon style={{margin: theme.spacing(1), verticalAlign: "middle", fontSize: 35, color: grey[500]}}/>
        </Grid>
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
    [theme.breakpoints.up("md")]: {
      width: `calc(${window.innerWidth}px*0.85)`,
    },
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
