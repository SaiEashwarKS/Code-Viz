import { createContext } from "react";
import { Colors } from "./colors";

const isDark = false;
export const ThemeContext = createContext({Colors:Colors.light, isDark, setIsDark:(e:any)=>{}});