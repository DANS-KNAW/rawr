import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Label,
} from "@headlessui/react";
import { useContext, useEffect, useState } from "react";
import { ComboBoxDataItem, ComboBoxInputDto } from "../../types/inputs-types";
import InfoIcon from "../icons/Info";
import ConfigContext from "../../context/ConfigContext";

export default function TypeAHead({
  inputProps,
}: {
  inputProps: ComboBoxInputDto;
}) {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<ComboBoxDataItem[]>(inputProps.data);
  const [multipleItems, setMultipleItems] = useState<ComboBoxDataItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<ComboBoxDataItem | null>(
    null
  );

  const { config, updateConfig } = useContext(ConfigContext);
  const internalID = inputProps.name.toLowerCase().replace(" ", "_");
  const multiple = inputProps.multiple;

  const shouldDisable =
    inputProps.disabled !== undefined || inputProps.submitting !== undefined
      ? inputProps.disabled || inputProps.submitting
      : undefined;

  const removeCustomItem = (item: ComboBoxDataItem) => {
    const updatedData = data.filter((dataItem) => dataItem.id !== item.id);
    setData(updatedData);
    if (multiple) {
      setMultipleItems(
        multipleItems.filter((selectedItem) => selectedItem.id !== item.id)
      );
    } else if (selectedItem && selectedItem.id === item.id) {
      setSelectedItem(null);
    }

    updateConfig({
      ...config,
      keywords: config.keywords.filter((keyword) => keyword.id !== item.id),
    });
  };

  useEffect(() => {
    const initialValues = (
      Array.isArray(inputProps.value) ? inputProps.value : [inputProps.value]
    ).filter(Boolean) as ComboBoxDataItem[];

    if (initialValues.length) {
      if (multiple) {
        setMultipleItems(initialValues);
      } else {
        setSelectedItem(initialValues[0]);
      }
    }
  }, [inputProps.value]);

  useEffect(() => {
    if (inputProps.defaultValue) {
      const item = data.find((item) => item.id === inputProps.defaultValue);
      if (item) {
        setSelectedItem(item);
      }
    }
  }, [inputProps.defaultValue]);

  useEffect(() => {
    if (inputProps.allowCustomValue && selectedItem !== null) {
      if (selectedItem.id.startsWith("custom-")) {
        const exists = data.some((item) => item.id === selectedItem.id);
        if (!exists) {
          const newItems = [...data, selectedItem];
          setData(newItems);
        }
      }
    }
    if (!multiple && selectedItem !== null) {
      inputProps.callback(internalID, selectedItem);
    }
    if (multiple && selectedItem !== null) {
      const newItems = [...multipleItems, selectedItem];
      setMultipleItems(newItems);
      inputProps.callback(internalID, multipleItems);
    }
  }, [selectedItem]);

  useEffect(() => {
    if (multiple) {
      inputProps.callback(internalID, multipleItems);
    }
  }, [multipleItems]);

  const filteredItems =
    query === ""
      ? data
      : data.filter((item) => {
          const label = item.label || "";
          return label.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox
      as="div"
      value={selectedItem}
      onChange={(value: ComboBoxDataItem | null) => {
        setSelectedItem(value);
      }}
      disabled={shouldDisable}
      onClose={() => setQuery("")}
    >
      <div className="flex justify-between items-center">
        <Label
          htmlFor={internalID}
          className="text-sm leading-6 text-gray-900 capitalize flex-1"
        >
          <span>{inputProps.name}</span>
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
      {multiple && multipleItems.length > 0 && (
        <ul className="my-2 space-x-2 space-y-2">
          {multipleItems.map((item) => (
            <button
              disabled={shouldDisable}
              key={item.id}
              onClick={() =>
                setMultipleItems(multipleItems.filter((i) => i.id !== item.id))
              }
              type="button"
              className="inline-flex items-center rounded-md bg-rda-50 px-2 py-1 text-xs font-medium text-rda-500 ring-1 ring-inset ring-rda-500/10 hover:bg-rda-100 hover:text-rda-600 disabled:cursor-not-allowed disabled:bg-rda-50 disabled:hover:text-rda-500"
            >
              {item.label} X
            </button>
          ))}
        </ul>
      )}
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
          className="w-full rounded-md border-0 bg-white py-1.5 pl-8 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-rda-500 sm:text-sm sm:leading-6 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:select-none"
          onChange={(event) => setQuery(event.target.value)}
          onBlur={() => setQuery("")}
          disabled={shouldDisable}
          displayValue={(item: ComboBoxDataItem | null) =>
            item ? item.label : ""
          }
          required={inputProps.required ?? undefined}
        />
        <ComboboxButton
          disabled={shouldDisable}
          className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2"
        >
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

        {inputProps.allowCustomValue &&
          filteredItems.length < 1 &&
          query.length > 0 && (
            <ComboboxOptions
              className={`absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-sm ${
                inputProps.dropdownUp ? "bottom-10" : ""
              }`}
            >
              <ComboboxOption
                value={
                  {
                    id: `custom-${
                      query.toLowerCase().replace(" ", "_") ||
                      Date.now() + "-" + Math.floor(Math.random() * 1000)
                    }`,
                    label: query,
                    value: query,
                  } as ComboBoxDataItem
                }
                className="relative select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-gray-200 cursor-pointer"
              >
                Create <span className="font-bold">"{query}"</span>
              </ComboboxOption>
            </ComboboxOptions>
          )}

        {filteredItems.length > 0 && (
          <ComboboxOptions
            className={`absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-sm ${
              inputProps.dropdownUp ? "bottom-10" : ""
            }`}
          >
            {filteredItems.map((item) => {
              const isSelected =
                multiple &&
                multipleItems.some(
                  (selectedItem) => selectedItem.id === item.id
                );
              return (
                <div className="flex w-full overflow-hidden">
                  {/* Remove custom value button */}
                  {inputProps.allowCustomValue == true && (
                    <button
                      type="button"
                      className="flex items-center text-red-400 px-2 hover:bg-red-200 rounded-r-md"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeCustomItem(item);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  )}

                  <ComboboxOption
                    key={item.id}
                    value={item}
                    className={`text-gray-900 relative w-full h-full flex items-center cursor-default select-none py-2 pl-3 pr-9 hover:bg-rda-500 hover:text-white ${
                      inputProps.allowCustomValue ? "rounded-l-md" : ""
                    }
                      ${
                        isSelected &&
                        "cursor-not-allowed bg-gray-200 text-gray-500"
                      }`}
                    disabled={isSelected}
                  >
                    {({ focus, selected }) => (
                      <>
                        <span
                          className={`block break-words ${
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
                </div>
              );
            })}
          </ComboboxOptions>
        )}
      </div>
    </Combobox>
  );
}
