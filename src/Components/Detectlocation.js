import {useState} from "react";
import Button from "@material-ui/core/Button";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import {green,yellow} from "@material-ui/core/colors";
const Detectlocation = () => {
    const [values,setValues] = useState({
        disabled: false,
        color: green['A400'],
    });
    const handleChange = ({name,value}) =>
        setValues({...values, [name]: value});

    return (
        <Button
            variant="contained"
            disabled={values.disabled}
            style={{backgroundColor: values.color}}
            startIcon={<MyLocationIcon />}
          >
            Detect Location
          </Button>
    );
}

export default Detectlocation;
