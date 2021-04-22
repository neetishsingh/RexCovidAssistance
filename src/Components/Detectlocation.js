import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import MyLocationIcon from "@material-ui/icons/MyLocation";
const Detectlocation = () => {
  const location = [];
  const [disabled, setdisabled] = useState(false);
  const [detectlocation, setDetectlocation] = useState(false);
  //const [, setUpdate] = useState();
  useEffect(() => {
    let options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const success = (pos) => {
      let crd = pos.coords;

      // console.log("Your current position is:");
      // console.log(`Latitude : ${crd.latitude}`);
      // console.log(`Longitude: ${crd.longitude}`);
      // console.log(`More or less ${crd.accuracy} meters.`);
      location.push({ latitude: crd.latitude, longitude: crd.longitude });
    };

    const errors = (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    for (let i = 0; i < 1; i++) {
      if (detectlocation === true) {
        if (navigator.geolocation) {
          navigator.permissions
            .query({ name: "geolocation" })
            .then((result) => {
              if (result.state === "granted") {
                console.log("result state = ", result.state);
                navigator.geolocation.getCurrentPosition(success);
              } else if (result.state === "prompt") {
                console.log("result state = ", result.state);
                navigator.geolocation.getCurrentPosition(
                  success,
                  errors,
                  options
                );
              } else if (result.state === "denied") {
                alert(
                  "Location Permission Denied! Emable permission to detect location"
                );
                setdisabled(true);
              }
              result.onchange = function () {
                console.log(result.state);
              };
            });
        } else {
          alert("Sorry Not available!");
        }
      }
    }
  });

  useEffect(() => {
    console.log("Emit location", location);
  });
  return (
    <Button
      variant="contained"
      disabled={disabled}
      color="primary"
      startIcon={<MyLocationIcon />}
      onClick={() => setDetectlocation(true)}
    >
      Detect Location
    </Button>
  );
};

export default Detectlocation;
