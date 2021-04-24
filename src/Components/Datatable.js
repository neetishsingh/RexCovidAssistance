import { Fragment } from "react";
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
import {GiStethoscope} from "react-icons/gi";
import {RiVirusFill} from "react-icons/ri";
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
                {/* Beds */}
                {detail.Amount.No_hospitalBed &&
                detail.Amount.No_hospitalBed !== "" ? (
                  <Fragment>
                    <Hidden mdDown>
                      <Typography
                        variant="subtitle2"
                        className={classes.textParameteres}
                      >
                        Beds:
                      </Typography>
                    </Hidden>
                    <Badge
                      badgeContent={detail.Amount.No_hospitalBed}
                      color="secondary"
                    >
                      <HotelIcon
                        style={{
                          color: IconColor(detail.Amount.No_hospitalBed),
                        }}
                        className={classes.icons}
                      />
                    </Badge>
                  </Fragment>
                ) : null}
                {/* Oxygen */}
                {detail.Amount.No_oxygen && detail.Amount.No_oxygen !== "" ? (
                  <Fragment>
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
                  </Fragment>
                ) : null}
                {/* Ventilators: */}
                {detail.Amount.No_ventilator &&
                detail.Amount.No_ventilator !== "" ? (
                  <Fragment>
                    <Hidden mdDown>
                      <Typography
                        variant="subtitle2"
                        className={classes.textParameteres}
                      >
                        Doctors:
                      </Typography>
                    </Hidden>
                    <Badge
                      badgeContent={detail.Amount.No_ventilator}
                      color="secondary"
                      className={classes.icons}
                    >
                      <FaHandHoldingHeart
                        style={{
                          color: IconColor(detail.Amount.No_ventilator),
                        }}
                        className={classes.icons}
                      />
                    </Badge>
                  </Fragment>
                ) : null}
                {/* Doctors */}
                {detail.Amount.No_doctor &&
                detail.Amount.No_doctor !== "" ? (
                  <Fragment>
                    <Hidden mdDown>
                      <Typography
                        variant="subtitle2"
                        className={classes.textParameteres}
                      >
                        Doctors:
                      </Typography>
                    </Hidden>
                    <Badge
                      badgeContent={detail.Amount.No_doctor}
                      color="secondary"
                      className={classes.icons}
                    >
                      <GiStethoscope
                        style={{
                          color: IconColor(detail.Amount.No_doctor),
                        }}
                        className={classes.icons}
                      />
                    </Badge>
                  </Fragment>
                ) : null}
                {/* Quarantine */}
                {detail.Amount.No_Qfacilities &&
                detail.Amount.No_Qfacilities !== "" ? (
                  <Fragment>
                    <Hidden mdDown>
                      <Typography
                        variant="subtitle2"
                        className={classes.textParameteres}
                      >
                        Isolation Wards:
                      </Typography>
                    </Hidden>
                    <Badge
                      badgeContent={detail.Amount.No_Qfacilities}
                      color="secondary"
                      className={classes.icons}
                    >
                      <RiVirusFill
                        style={{
                          color: IconColor(detail.Amount.No_Qfacilities),
                        }}
                        className={classes.icons}
                      />
                    </Badge>
                  </Fragment>
                ) : null}
                {detail.Amount.contact && detail.Amount.contact !== "--" ? (
                  <Fragment>
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
                        className={
                          mediaQuery ? classes.icons : classes.PhoneIcon
                        }
                      />
                    </Link>
                  </Fragment>
                ) : null}
              </div>
            </Paper>
          </Grid>
        ))
      ) : (
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Typography
            variant="subtitle1"
            style={{
              textAlign: "center",
            }}
          >
            Search for Centers to see results
          </Typography>
        </Grid>
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
