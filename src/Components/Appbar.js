import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Link, useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useStateContext } from "../Context/ContextProvider";
import Axios from "axios";
let drawerWidth;
if (window.innerWidth > 600) {
  drawerWidth = 240;
} else {
  drawerWidth = 180;
}

const TopBar = (props) => {
  const theme = useTheme();
  const classes = useStyles();
  // is the minimum width 600px false for mobile devides
  const mediaQuery = useMediaQuery("(min-width:600px)");
  const [{ user }, dispatch] = useStateContext();
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const history = useHistory();
  const login = () => {
    history.push("/login");
  };
  const DeleteSession  = async(doc,token) =>{
    let response = await Axios.post("http://localhost:5000/logout",doc,{headers:{
      refreshToken: token
    }});
    console.log(response.data);
    return response.data;
  }
  const logOut = () => {
    DeleteSession({Email:user.Email}, user.refresh).then((response)=>{
      dispatch({
        type: "REMOVE_USER"
      });
      localStorage.removeItem('RexCovid-refreshToken');
      history.push("/");
    }).catch((err)=>{
      console.log("Error occoured",err);
    });
  }
  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
            style={{ color: "#191414" }}
          >
            <MenuIcon />
          </IconButton>

          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography
              variant="h6"
              style={{ color: "#191414", fontWeight: 400 }}
            >
              Rex Assistance
            </Typography>
          </Link>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {user !== undefined ? (
              <React.Fragment>
                {mediaQuery ? (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={logOut}
                    startIcon={<ExitToAppIcon />}
                  >
                    Vendor Logout
                  </Button>
                ) : (
                  <IconButton onClick={logOut}>
                    <ExitToAppIcon />
                  </IconButton>
                )}
              </React.Fragment>
            ) : (
              <React.Fragment>
                {mediaQuery ? (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={login}
                    startIcon={<AccountCircleIcon />}
                  >
                    Vendor Login
                  </Button>
                ) : (
                  <IconButton onClick={login}>
                    <AccountCircleIcon />
                  </IconButton>
                )}
              </React.Fragment>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {/* Content Goes here */}
        {props.children}
      </main>
    </div>
  );
};
export default TopBar;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    marginTop: "2%",
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    //Don't put any left margin here
  },
}));
