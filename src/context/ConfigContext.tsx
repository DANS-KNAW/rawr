import { createContext } from "react";
import { Config } from "../background";

export interface ConfigContextType {
  config: Config;
  updateConfig: (config: Config) => void;
}

const ConfigContext = createContext<ConfigContextType>({
  config: {} as Config,
  updateConfig: (config: Config) => {
    config;
  },
});

export default ConfigContext;
