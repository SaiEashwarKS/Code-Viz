import { createContext } from "react";
import { Colors } from "./colors";

export type configType = {
  fontSize: number;
  isDark: boolean;
  Colors: typeof Colors.light;
};

export const defaultConfig: configType = {
  fontSize: 16,
  isDark: false,
  Colors: Colors.light,
};

const setConfig = (config: Partial<configType>) => {};

export const ConfigContext = createContext({
  config: defaultConfig,
  setConfig,
});
