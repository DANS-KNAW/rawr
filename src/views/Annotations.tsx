import { useContext } from "react";
import ConfigContext from "../context/ConfigContext";
import NavigationContext from "../context/NavigationContext";

export default function Annotations() {
  const { config, updateConfig } = useContext(ConfigContext);
  const { setCurrent } = useContext(NavigationContext);

  return (
    <div className="relative h-full w-full flex flex-col">
      <div className="border-b border-gray-200 p-5">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Annotations
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          This annotation tool is requested by the Research Data Alliance (RDA)
          and developed by Data Archiving and Networked Services (DANS) of the
          Royal Netherlands Academy of Arts and Sciences (KNAW).
        </p>
      </div>
      <div className="flex justify-center items-center px-5 border-y border-gray-300 divide-x divide-gray-300">
        <a
          target="_blank"
          href="https://www.rd-alliance.org/"
          className="w-1/2 h-full flex items-center justify-center pr-2"
        >
          <img
            src={chrome.runtime.getURL("images/rda.png")}
            alt="RDA"
            className="opacity-80 "
          />
        </a>
        <a
          target="_blank"
          href="https://www.dans.knaw.nl"
          className="w-1/2 h-full flex items-center justify-center pl-2"
        >
          <img
            src={chrome.runtime.getURL("images/dans.png")}
            alt="DANS KNAW"
            className="opacity-80 "
          />
        </a>
      </div>
      <div className="p-5">
        <h4 className="mt-4 text-base font-semibold leading-6 text-gray-900">
          Where can I find my annotations?
        </h4>
        <p className="mt-2 text-sm text-gray-500">
          Your annotations will currently be deposited on the Search and
          Descovory enviroment. Currently located at rda.dansdemo.nl
        </p>
        <button
          onClick={() => {
            setCurrent("form");
          }}
          type="button"
          className="rounded-md mt-6 bg-rda-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rda-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rda-500 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-rda-500 disabled:select-none"
        >
          Create Annotation
        </button>
      </div>
      {config != undefined && config.seenActiveDevelopmentWarning == false && (
        <div className="w-full h-full z-50 fixed inset-0 top-10">
          <div className="w-full h-full absolute inset-0 opacity-20 bg-black"></div>
          <div className="relative z-50 flex justify-center h-full items-center">
            <div className="rounded-md bg-yellow-50 p-4 m-2">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-yellow-400"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                  />
                </svg>
                <h3 className="text-sm font-medium text-yellow-800 ml-2">
                  Attention needed
                </h3>
              </div>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  This extension is currently under active development. Please
                  note that all components and features are subject to change
                  and may not reflect the final product.
                </p>
                <p className="mt-2">
                  Additionally, please be aware that any annotations and data
                  entered or stored with this extension may not persist and
                  could be lost at any moment. We recommend{" "}
                  <span className="text-yellow-800 font-medium">not</span>{" "}
                  storing critical information at this time.
                </p>
              </div>
              <button
                onClick={() => {
                  updateConfig({
                    ...config,
                    seenActiveDevelopmentWarning: true,
                  });
                }}
                type="button"
                className="rounded-md mt-4 bg-yellow-700 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-yellow-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-700"
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
