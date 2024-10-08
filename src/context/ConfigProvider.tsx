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
    skipWelcome: false,
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
    const loadConfig = async () => {
      try {
        const result = await chrome.storage.local.get("config");
        if (result.config) {
          setConfig(result.config);
        }
      } catch (error) {
        console.error("Error loading config:", error);
      } finally {
        setLoading(false);
      }
    };

    loadConfig();
  }, []);

  useEffect(() => {
    if (!loading) {
      const saveConfig = async () => {
        try {
          await chrome.storage.local.set({ config });
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
