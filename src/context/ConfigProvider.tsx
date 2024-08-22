import { ReactNode, useEffect, useState } from "react";
import { Config } from "../background";
import ConfigContext from "./ConfigContext";

export const ConfigProvider = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  const [loading, setLoading] = useState(true);
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
    rememberAnnotationChoices: false,
    choices: {},
    keywords: [],
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
      setLoading(false);
    });
  }, []);

  
  useEffect(() => {
    if (!loading) {
      const saveConfig = async () => {
        try {
          await new Promise<void>((resolve, reject) => {
            chrome.storage.local.set({ config }, () => {
              if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
              } else {
                resolve();
              }
            });
          });
        } catch (error) {
          console.error("Error saving config:", error);
        }
      };

      saveConfig();
    }
  }, [config, loading]);

  return (
    <ConfigContext.Provider value={{ config, updateConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};
