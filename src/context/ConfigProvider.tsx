import { ReactNode, useEffect, useState } from "react";
import { Config } from "../background";
import ConfigContext from "./ConfigContext";

export const ConfigProvider = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  const [config, setConfig] = useState<Config>({
    seenActiveDevelopmentWarning: false,
    vocabularies: {
      working_groups: false,
      interest_groups: false,
      pathways: false,
      gorc_elements: false,
      gorc_attributes: false,
      domains: false,
    },
  });

  const updateConfig = (config: Config) => {
    setConfig((prev) => ({
      ...prev,
      ...config,
      vocabularies: {
        ...prev.vocabularies,
        ...config.vocabularies,
      },
    }));
  };

  useEffect(() => {
    chrome.storage.local.get("config", ({ config }) => {
      if (config) {
        setConfig(config);
      }
    });
  }, []);

  useEffect(() => {
    chrome.storage.local.set({ config });
  }, [config]);

  return (
    <ConfigContext.Provider value={{ config, updateConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};
