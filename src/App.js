import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import UploadCode from "./UploadCode";
import Visualiser from "./Visualiser";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <div className="text-center">
              <UploadCode />
            </div>
          </Route>
          <Route path="/visualise">
            <Visualiser />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
