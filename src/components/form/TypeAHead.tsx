import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Label,
} from "@headlessui/react";
import { useState } from "react";
import { ComboBoxDataItem, ComboBoxInputDto } from "../../types/inputs-types";
import InfoIcon from "../icons/Info";

export default function TypeAHead({
  inputProps,
}: {
  inputProps: ComboBoxInputDto;
}) {
  const [query, setQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(undefined);
  const internalID = inputProps.name.toLowerCase().replace(" ", "-");

  // useEffect(() => {
  //   inputProps.callback(internalID, value);
  // }, [value]);

  const filteredItems =
    query === ""
      ? inputProps.data
      : inputProps.data.filter((item) => {
          return item.label.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox
      as="div"
      value={selectedItem}
      onChange={setSelectedItem}
    >
      <div className="flex justify-between items-center">
        <Label
          htmlFor={internalID}
          className="text-sm leading-6 text-gray-900 capitalize flex-1"
        >
          <span>{inputProps.name.toLowerCase()}</span>
          {inputProps.required === true && (
            <span className="text-red-500 ml-1">*</span>
          )}
        </Label>
        {inputProps.info != undefined && (
          <div onClick={() => inputProps.infoDialog(inputProps.info!)}>
            <InfoIcon className="size-5 cursor-pointer text-gray-900 hover:text-rda-500" />
          </div>
        )}
      </div>
      <div className="relative mt-2">
        <div className="absolute inset-y-0 left-0 flex items-center rounded-l-md px-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4 text-gray-400"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
        <ComboboxInput
          className="w-full rounded-md border-0 bg-white py-1.5 pl-8 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-rda-500 sm:text-sm sm:leading-6"
          onChange={(event) => setQuery(event.target.value)}
          onBlur={() => setQuery("")}
          displayValue={(item: ComboBoxDataItem) => item.label}
        />
        <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
            />
          </svg>
        </ComboboxButton>

        {filteredItems.length > 0 && (
          <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredItems.map((item) => (
              <ComboboxOption
                key={item.identifier}
                value={item}
                className={({ focus }) =>
                  `relative cursor-default select-none py-2 pl-3 pr-9 ${
                    focus ? "bg-rda-500 text-white" : "text-gray-900"
                  }`
                }
              >
                {({ focus, selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected && "font-semibold"
                      }`}
                    >
                      {item.label}
                    </span>

                    {selected && (
                      <span
                        className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                          focus ? "text-white" : "text-rda-500"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="h-5 w-5"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m4.5 12.75 6 6 9-13.5"
                          />
                        </svg>
                      </span>
                    )}
                  </>
                )}
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        )}
      </div>
    </Combobox>
  );
}
