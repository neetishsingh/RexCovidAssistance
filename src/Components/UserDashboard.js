import { useState, Fragment, useEffect } from "react";
import TopBar from "./Appbar";
import {
  Typography,
  Grid,
  Paper,
  makeStyles,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
} from "@material-ui/core";
import { useStateContext } from "../Context/ContextProvider";
import { useLocation } from "react-router-dom";
import React from "react";
import { grey } from "@material-ui/core/colors";
import Axios from "axios";
function UserDashboard(props) {
  const [{ user, Vendorlocation, Backend }] = useStateContext();
  const fetchPreviousData = async () => {
    let response = await Axios.get(`${Backend}/getDetails`, {
      headers: {
        refreshToken: localStorage.getItem("RexCovid-refreshToken"),
      },
    });
    return response.data;
  };
  //const userEmail = props.match.params.userEmail;
  const { search } = useLocation();
  const match = search.match(/user=(.*)/);
  const userEmail = match?.[1];
  const classes = useStyles();
  const [state, setState] = useState({
    oxygen: false,
    ventilator: false,
    hospitalBed: false,
    medicine: false,
    openMedicineDock: false,
    doctor: false,
    Qfacilities: false,
  });
  const [NumberStates, setNumberState] = useState({
    No_oxygen: "--",
    No_ventilator: "--",
    No_hospitalBed: "--",
    No_doctor: "--",
    No_Qfacilities: "--",
    contact: "--",
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const handleQuantity = (event) => {
    setNumberState({
      ...NumberStates,
      [event.target.name]: event.target.value,
    });
  };
  useEffect(() => {
    console.log("user", user);
    if (localStorage.getItem("RexCovid-refreshToken") !== "null") {
      console.log(
        "calling useEffect",
        localStorage.getItem("RexCovid-refreshToken")
      );
      fetchPreviousData()
        .then((previousData) => {
          console.log("Previous config", previousData.Details);
          setState({
            ...previousData.Details.Facilities,
          });
          setNumberState({
            ...previousData.Details.Amount,
          });
        })
        .catch((err) => {
          console.log("Error while fetching previous data", err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const submit = async (e) => {
    e.preventDefault();
    if (Vendorlocation !== undefined) {
      let response = await Axios.post(
        `${Backend}/userDetails`,
        {
          Name: user.Name,
          Email: user.Email,
          Facilities: state,
          Amount: NumberStates,
          Location: Vendorlocation,
        },
        {
          headers: {
            refreshToken: user.refresh,
          },
        }
      );
      console.log(response.data);
      return response.data;
    }
    else
    {
      alert("Wait for Location to be Detected.\n Press Search after some time");
    }
  };
  const reset = (e) => {
    e.preventDefault();
    setState({
      oxygen: false,
      ventilator: false,
      hospitalBed: false,
      medicine: false,
      doctor: false,
      openMedicineDock: false,
      location: false,
      Qfacilities: false,
    });
    setNumberState({
      No_oxygen: "--",
      No_ventilator: "--",
      No_hospitalBed: "--",
      No_doctor: "--",
      location: "--",
      No_Qfacilities: "--",
      contact: "--",
    });
  };

  return (
    <Fragment>
      {user !== undefined && user.Email === userEmail ? (
        <TopBar>
          <Grid container className={classes.root}>
            <Grid item xs={12}>
              <Typography variant="h3">Hello {user.Name},</Typography>
            </Grid>
            <Paper className={classes.paper} elevation={3}>
              <Grid item xs={12}>
                <Typography variant="h5"> Dashboard</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="subtitle1"
                  className={classes.formSections}
                >
                  Tick the Facilities you Provide
                </Typography>
              </Grid>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.oxygen}
                      onChange={handleChange}
                      name="oxygen"
                      color="secondary"
                    />
                  }
                  label="Oxygen"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.ventilator}
                      onChange={handleChange}
                      name="ventilator"
                      color="secondary"
                    />
                  }
                  label="Ventilator"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.hospitalBed}
                      onChange={handleChange}
                      name="hospitalBed"
                      color="secondary"
                    />
                  }
                  label="Hospital Bed"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.doctor}
                      onChange={handleChange}
                      name="doctor"
                      color="secondary"
                    />
                  }
                  label="Doctor"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.Qfacilities}
                      onChange={handleChange}
                      name="Qfacilities"
                      color="secondary"
                    />
                  }
                  label="Qrantine Wards"
                />
              </FormGroup>
              <Grid item xs={12}>
                <Typography
                  variant="subtitle1"
                  className={classes.formSections}
                >
                  Provide Details about your facilities
                </Typography>
              </Grid>
              {state.oxygen && (
                <Fragment>
                  <Grid item xs={12}>
                    <Typography
                      variant="body1"
                      color="secondary"
                      className={classes.sectionNames}
                    >
                      Oxygen
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      name="No_oxygen"
                      label="Number of Oxygen Cylinders"
                      className={classes.textField}
                      value={NumberStates.No_oxygen}
                      onChange={handleQuantity}
                    />
                  </Grid>
                </Fragment>
              )}
              {state.ventilator && (
                <Fragment>
                  <Grid item xs={12}>
                    <Typography
                      variant="body1"
                      color="secondary"
                      className={classes.sectionNames}
                    >
                      Ventilators
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      name="No_ventilator"
                      label="Number of Ventilators"
                      className={classes.textField}
                      value={NumberStates.No_ventilator}
                      onChange={handleQuantity}
                    />
                  </Grid>
                </Fragment>
              )}
              {state.hospitalBed && (
                <Fragment>
                  <Grid item xs={12}>
                    <Typography
                      variant="body1"
                      color="secondary"
                      className={classes.sectionNames}
                    >
                      Beds
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      label="Number of Beds available"
                      name="No_hospitalBed"
                      className={classes.textField}
                      value={NumberStates.No_hospitalBed}
                      onChange={handleQuantity}
                    />
                  </Grid>
                </Fragment>
              )}
              {state.doctor && (
                <Fragment>
                  <Grid item xs={12}>
                    <Typography
                      variant="body1"
                      color="secondary"
                      className={classes.sectionNames}
                    >
                      Doctors
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      name="No_doctor"
                      label="Number of Doctors on Duty"
                      className={classes.textField}
                      value={NumberStates.No_doctor}
                      onChange={handleQuantity}
                    />
                  </Grid>
                </Fragment>
              )}
              {state.Qfacilities && (
                <Fragment>
                  <Grid item xs={12}>
                    <Typography
                      variant="body1"
                      color="secondary"
                      className={classes.sectionNames}
                    >
                      Quarantine Facilities
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      name="No_Qfacilities"
                      label="Number of Quarantine Facilities"
                      className={classes.textField}
                      value={NumberStates.No_Qfacilities}
                      onChange={handleQuantity}
                    />
                  </Grid>
                </Fragment>
              )}
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  name="contact"
                  label="Contact Number"
                  className={classes.textField}
                  value={NumberStates.contact}
                  onChange={handleQuantity}
                />
              </Grid>
              <Grid item xs={12} className={classes.buttons}>
                {props.children}
              </Grid>
              <Grid item xs={12} className={classes.buttons}>
                <Button color="secondary" onClick={reset}>
                  RESET
                </Button>
                <Button variant="contained" color="primary" onClick={submit}>
                  SUBMIT
                </Button>
              </Grid>
            </Paper>
          </Grid>
        </TopBar>
      ) : (
        <h1 style={{ color: "red" }}>You are not allwed here !</h1>
      )}
    </Fragment>
  );
}

export default UserDashboard;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  paper: {
    padding: theme.spacing(2),
  },
  formSections: {
    color: grey[500],
    margin: theme.spacing(1),
  },
  textField: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  sectionNames: {
    margin: theme.spacing(1),
  },
  buttons: {
    justifyContent: "space-evenly",
    display: "flex",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));
