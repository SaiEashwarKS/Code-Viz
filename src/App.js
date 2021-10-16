import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import UploadCode from "./UploadCode";
import Visualiser from "./Visualiser";

const code = `a = 10

S=6
d=14

b = a

if S==6:
    k=7
else:
    k=8`;

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
            <Visualiser code={code} mode={"python"} />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
