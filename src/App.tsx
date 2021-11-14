import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Colors } from "./colors";
import UploadCode from "./UploadCode";
import Visualiser from "./Visualiser";
import { ConfigContext, configType, defaultConfig } from "./config";

const code = `#include<stdio.h>
int g=0;
int main()
{
    printf("HELLO\\t%d\\n",g);
}

`;

function App() {
  const [configValue, setConfigValue] = useState<configType>(defaultConfig);
  const setConfig = (config: Partial<configType>) => {
    setConfigValue((prevConfig: configType) => {
      return { ...prevConfig, ...config };
    });
  };
  const { isDark } = configValue;
  const colors = isDark ? Colors.dark : Colors.light;
  const configContextValue = {
    config: { ...configValue, Colors: colors },
    setConfig,
  };

  useEffect(() => {
    document.body.style.backgroundColor = colors.white_1;
  }, [isDark]);

  return (
    <>
      <ConfigContext.Provider value={configContextValue}>
        <Router>
          <Switch>
            <Route exact path="/">
              <div className="text-center">
                <UploadCode />
              </div>
            </Route>
            <Route path="/visualise">
              <Visualiser code={code} mode={"c_cpp"} />
            </Route>
          </Switch>
        </Router>
      </ConfigContext.Provider>
    </>
  );
}

export default App;
