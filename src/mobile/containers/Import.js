import { Route, Switch } from "react-router";
import AddUser from "../components/Dashboard/AddUser/addUser";
import ImportCSV from "../components/Dashboard/AddUser/CSV/importCSV";
import AddManual from "../components/Dashboard/AddUser/Manual/addmanual";

function Import ()
{
    return (
        <Switch>
            <Route exact path="/import">
                <AddUser />
            </Route>
            <Route path="/import/csv">
                <ImportCSV />
            </Route>
            <Route path="/import/manual">
                <AddManual />
            </Route>
        </Switch>
    )
}

export default Import