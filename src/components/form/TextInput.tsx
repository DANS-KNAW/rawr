import { useEffect, useState } from "react";
import { TextInputDto } from "../../types/inputs-types";
import InfoIcon from "../icons/Info";

export default function TextInput({
  inputProps,
}: {
  inputProps: TextInputDto;
}) {
  const [value, setValue] = useState<string>(inputProps.value ?? "");
  const internalID = inputProps.name.toLowerCase().replace(" ", "-");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    setValue(inputProps.value ?? "");
  }, [inputProps.value]);

  useEffect(() => {
    inputProps.callback(internalID, value);
  }, [value]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <label
          htmlFor={internalID}
          className="text-sm leading-6 text-gray-900 capitalize flex-1"
        >
          <span>{inputProps.name.toLowerCase()}</span>
          {inputProps.required === true && (
            <span className="text-red-500 ml-1">*</span>
          )}
        </label>
        {inputProps.info != undefined && (
          <div onClick={() => inputProps.infoDialog(inputProps.info!)}>
            <InfoIcon className="size-5 cursor-pointer text-gray-900 hover:text-rda-500" />
          </div>
        )}
      </div>
      <div className="mt-2">
        <input
          type="text"
          name={internalID}
          id={internalID}
          onChange={handleChange}
          required={inputProps.required ?? undefined}
          disabled={inputProps.disabled ?? undefined}
          value={value}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rda-500 text-sm leading-6 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:select-none"
        />
      </div>
    </div>
  );
}
