import { ReactNode, useEffect, useState } from "react";
import { Config } from "../background";
import ConfigContext from "./ConfigContext";

export const ConfigProvider = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  const [config, setConfig] = useState<Config>({
    seenActiveDevelopmentWarning: true,
    vocabularies: {
      working_groups: true,
      interest_groups: true,
      pathways: true,
      gorc_elements: true,
      gorc_attributes: true,
      domains: true,
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
