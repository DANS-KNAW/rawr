import SwitchToggle from "../components/SwitchToggle";

interface Vocabulary {
  name: string;
  description?: string;
  enabled: boolean;
}

const vocabularies: Vocabulary[] = [
  {
    name: "Working Groups",
    description: "Select an RDA Working Group from the list.",
    enabled: true,
  },
  {
    name: "Interest Groups",
    description: "Select an RDA Interest Group from the list.",
    enabled: true,
  },
  {
    name: "Pathways",
    description: "Select an RDA Pathway from the list.",
    enabled: true,
  },
  {
    name: "GORC Elements",
    description: "Select a GORC Element from the list.",
    enabled: true,
  },
  {
    name: "GORC Attributes",
    description: "Select a GORC Attribute from the list.",
    enabled: true,
  },
  {
    name: "Domains",
    description: "Select an RDA Scientific Discipline (Domain) from the list.",
    enabled: true,
  },
];

export default function Settings() {
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
              <label className="text-sm leading-6 text-gray-900 capitalize flex-1">
                <span>{vocabulary.name}</span>
              </label>
              <p className="text-gray-500 text-xs">{vocabulary.description}</p>
            </div>
            <SwitchToggle />
          </div>
        ))}
      </div>
    </div>
  );
}
