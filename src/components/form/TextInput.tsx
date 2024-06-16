import { TextInputDto } from "../../types/inputs-types";
import InfoIcon from "../icons/Info";

export default function TextInput({
  inputProps,
}: {
  inputProps: TextInputDto;
}) {
  const internalID = inputProps.name.toLowerCase().replace(" ", "-");

  return (
    <div>
      <div className="flex justify-between items-center">
        <label
          htmlFor={internalID}
          className="text-sm leading-6 text-gray-900 capitalize flex-1"
        >
          {inputProps.name.toLowerCase()}
        </label>
        <InfoIcon className="size-5 cursor-pointer hover:text-rda-500" />
      </div>
      <div className="mt-2">
        <input
          type="text"
          name={internalID}
          id={internalID}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rda-500 text-sm leading-6"
        />
      </div>
    </div>
  );
}
