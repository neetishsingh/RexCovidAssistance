import React from "react";
import {
  Grid,
  Paper,
  makeStyles,
  Typography,
  useMediaQuery,
  Badge,
  Hidden,
} from "@material-ui/core";
import HotelIcon from "@material-ui/icons/Hotel";
import PhoneIcon from "@material-ui/icons/Phone";
import { BiWind } from "react-icons/bi";
import { FaHandHoldingHeart } from "react-icons/fa";
import { green, yellow, red, blue } from "@material-ui/core/colors";
import Link from "@material-ui/core/Link";
import { useStateContext } from "../Context/ContextProvider";

function Datatable() {
  const classes = useStyles();
  const [{ availableCentres }] = useStateContext();
  // is the minimum width 600px false for mobile devides
  const mediaQuery = useMediaQuery("(min-width:600px)");
  const IconColor = (number) => {
    number = parseInt(number);
    if (number <= 5) {
      return red[500];
    } else if (number > 5 && number <= 50) {
      return yellow[500];
    } else {
      return green[500];
    }
  };
  return (
    <Grid container spacing={2}>
      {availableCentres !== undefined ? (
        availableCentres.map((detail, index) => (
          <Grid item xs={12} key={index}>
            <Paper elevation={3} className={classes.root}>
              <Typography variant={mediaQuery ? "h5" : "subtitle1"}>
                {detail.Name}
              </Typography>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <Hidden mdDown>
                  <Typography
                    variant="subtitle2"
                    className={classes.textParameteres}
                  >
                    Beds:
                  </Typography>
                </Hidden>
                <Badge badgeContent={detail.Amount.No_hospitalBed} color="secondary">
                  <HotelIcon
                    style={{ color: IconColor(detail.Amount.No_hospitalBed) }}
                    className={classes.icons}
                  />
                </Badge>
                <Hidden mdDown>
                  <Typography
                    variant="subtitle2"
                    className={classes.textParameteres}
                  >
                    Oxygen:
                  </Typography>
                </Hidden>
                <Badge
                  badgeContent={detail.Amount.No_oxygen}
                  color="secondary"
                  className={classes.icons}
                >
                  <BiWind
                    style={{ color: IconColor(detail.Amount.No_oxygen) }}
                    className={classes.icons}
                  />
                </Badge>
                <Hidden mdDown>
                  <Typography
                    variant="subtitle2"
                    className={classes.textParameteres}
                  >
                    Ventilators:
                  </Typography>
                </Hidden>
                <Badge
                  badgeContent={detail.Amount.No_ventilator}
                  color="secondary"
                  className={classes.icons}
                >
                  <FaHandHoldingHeart
                    style={{ color: IconColor(detail.Amount.No_ventilator) }}
                    className={classes.icons}
                  />
                </Badge>
                <Hidden mdDown>
                  <Typography
                    variant="subtitle2"
                    className={classes.textParameteres}
                  >
                    Contact:
                  </Typography>
                </Hidden>
                <Link href={`tel:${detail.Amount.contact}`}>
                  <PhoneIcon
                    style={{ color: blue[500], verticalAlign: "middle" }}
                    className={mediaQuery ? classes.icons : classes.PhoneIcon}
                  />
                </Link>
              </div>
            </Paper>
          </Grid>
        ))
      ) : (
        <Typography variant="subtitle1">No Centres Found</Typography>
      )}
    </Grid>
  );
}

export default Datatable;
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    display: "flex",
  },
  textParameteres: {
    marginLeft: theme.spacing(2),
    display: "inline-flex",
  },
  icons: {
    marginLeft: theme.spacing(1),
    fontSize: 30,
  },
  PhoneIcon: {
    marginLeft: theme.spacing(2),
    fontSize: 30,
  },
  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: "flex",
  },
}));
