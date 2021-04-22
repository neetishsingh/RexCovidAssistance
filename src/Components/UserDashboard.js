import TopBar from "./Appbar";
import {Typography} from "@material-ui/core";
function UserDashboard({match}) {
    const userEmail = match.params.userEmail;
    return (
        <TopBar>
            <Typography variant="subtitle2">
                {userEmail}
            </Typography>
        </TopBar>
    );
}

export default UserDashboard;