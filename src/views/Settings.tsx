import { useContext, useEffect, useState } from "react";
import SwitchToggle from "../components/SwitchToggle";
import ConfigContext from "../context/ConfigContext";

interface Vocabulary {
  name: string;
  id: string;
  description?: string;
  enabled: boolean;
}

export default function Settings() {
  const [vocabularies, setVocabularies] = useState<Vocabulary[]>([
    {
      name: "Working Groups",
      id: "working_groups",
      description: "Select an RDA Working Group from the list.",
      enabled: false,
    },
    {
      name: "Interest Groups",
      id: "interest_groups",
      description: "Select an RDA Interest Group from the list.",
      enabled: false,
    },
    {
      name: "Pathways",
      id: "pathways",
      description: "Select an RDA Pathway from the list.",
      enabled: false,
    },
    {
      name: "GORC Elements",
      id: "gorc_elements",
      description: "Select a GORC Element from the list.",
      enabled: false,
    },
    {
      name: "GORC Attributes",
      id: "gorc_attributes",
      description: "Select a GORC Attribute from the list.",
      enabled: false,
    },
    {
      name: "Domains",
      id: "domains",
      description:
        "Select an RDA Scientific Discipline (Domain) from the list.",
      enabled: false,
    },
  ]);

  const { config, updateConfig } = useContext(ConfigContext);

  useEffect(() => {
    setVocabularies((prev) =>
      prev.map((v) => ({
        ...v,
        enabled: config.vocabularies[v.id as keyof typeof config.vocabularies],
      }))
    );
  }, [config]);

  return (
    <div className="relative h-full w-full">
      <div className="border-b border-gray-200 p-5">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Select Vocabulary
        </h3>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          The selected vocabularies will be added as options to tag new
          annotations.
        </p>
      </div>
      <div className="px-5 pb-8 pt-5 space-y-3 divide-y divide-gray-300">
        {vocabularies.map((vocabulary) => (
          <div
            key={vocabulary.name}
            className="flex justify-between items-center pt-3"
          >
            <div>
              <label className="text-sm font-medium leading-6 text-gray-900 capitalize flex-1">
                <span>{vocabulary.name}</span>
              </label>
              <p className="text-gray-500 text-xs">{vocabulary.description}</p>
            </div>
            <SwitchToggle
              enabled={vocabulary.enabled}
              callback={(enabled) => {
                updateConfig({
                  ...config,
                  vocabularies: {
                    ...config.vocabularies,
                    [vocabulary.id]: enabled,
                  },
                });
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
