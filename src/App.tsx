import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Colors } from "./colors";
import UploadCode from "./UploadCode";
import Visualiser from "./Visualiser";
import { ConfigContext, configType, defaultConfig } from "./config";
import {
  defaultInputContext,
  InputContext,
  inputContextType,
} from "./codeStore";

const code = `# Loops in python

l1 = []
l2 = []

for i in range(4):
	l1.append(i)
	
while(l1 != []):
	l2.append(l1.pop())


print("l2: ", l2)
`;

function App() {
  const [configValue, setConfigValue] = useState<configType>(defaultConfig);
  const [input, setInput] = useState<inputContextType>(defaultInputContext);

  const setConfig = (config: Partial<configType>) => {
    setConfigValue((prevConfig: configType) => {
      return { ...prevConfig, ...config };
    });
  };
  const setInputContext = (input: inputContextType) => {
    setInput(input);
  };

  const { isDark } = configValue;
  const colors = isDark ? Colors.dark : Colors.light;
  const configContextValue = {
    config: { ...configValue, Colors: colors },
    setConfig,
  };
  const inputContextValue = {
    input,
    setInputContext,
  };

  useEffect(() => {
    document.body.style.backgroundColor = colors.white_1;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDark]);

  return (
    <>
      <InputContext.Provider value={inputContextValue}>
        <ConfigContext.Provider value={configContextValue}>
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
        </ConfigContext.Provider>
      </InputContext.Provider>
    </>
  );
}

export default App;
