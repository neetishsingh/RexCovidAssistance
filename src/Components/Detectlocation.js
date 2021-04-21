import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import { green, yellow } from "@material-ui/core/colors";
const Detectlocation = () => {
  const [values, setValues] = useState({
    disabled: false,
    color: green["A400"],
    lat: 0,
    lon: 0,
  });
  const handleChange = ({ name, value }) =>
    setValues({ ...values, [name]: value });
  const success = (pos) => {
    var crd = pos.coords;

    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    handleChange('lat',crd.latitude);
    handleChange('lon',crd.longitude);
  }

  const errors = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  useEffect(() => {
    let options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    if (navigator.geolocation) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state === "granted") {
          console.log("result state = ", result.state);
          navigator.geolocation.getCurrentPosition(success);
        } else if (result.state === "prompt") {
          console.log("result state = ", result.state);
          navigator.geolocation.getCurrentPosition(success, errors, options);
        } else if (result.state === "denied") {
          console.log("result state = ", result.state);
        }
        result.onchange = function () {
          console.log(result.state);
        };
      });
    } else {
      alert("Sorry Not available!");
    }
  },[]);

  return (
    <Button
      variant="contained"
      disabled={values.disabled}
      style={{ backgroundColor: values.color }}
      startIcon={<MyLocationIcon />}
    >
      Detect Location
    </Button>
  );
};

export default Detectlocation;
