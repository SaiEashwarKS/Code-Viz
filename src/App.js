import { createContext, useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Colors } from "./colors";
import UploadCode from "./UploadCode";
import Visualiser from "./Visualiser";
import { ThemeContext } from "./theme";

const code = `a = [1,2,3,"saminamina"]

S=6
b = a

if S==6:
    k=7
    a.append(7)
else:
    k=8`;

function App() {
  const [isDark, setIsDark] = useState(false);
  const colors = isDark ? Colors.dark : Colors.light;

  useEffect(() => {
    document.body.style.backgroundColor = colors.white_1;
  }, [isDark]);

  const themeProviderValue = { Colors: colors, isDark, setIsDark };
  return (
    <>
      <ThemeContext.Provider value={themeProviderValue}>
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
      </ThemeContext.Provider>
    </>
  );
}

export default App;
