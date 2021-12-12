import { createContext } from "react";

export type inputContextType = {
  code: string | null;
  aceMode: "c_cpp" | "python";
  trace: { Lines_data: any[] } | null;
};

export const defaultInputContext: inputContextType = {
  code: null,
  aceMode: "c_cpp",
  trace: null,
};

const setInputContext = (input: inputContextType) => {};

export const InputContext = createContext({
  input: defaultInputContext,
  setInputContext,
});
