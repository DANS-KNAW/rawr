import { ReactNode } from "react";

export default function InfoDialog({
  displayToggle,
  content,
}: {
  displayToggle: () => void;
  content: ReactNode[];
}) {
  return (
    <div className="z-50 px-2 w-full">
      <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl flex flex-col w-full">
        <div className="flex items-center justify-between">
          <p className="text-base font-semibold leading-6 text-gray-900">
            Additional Information
          </p>

          <button
            type="button"
            onClick={displayToggle}
            className="rounded-md bg-white text-gray-400 hover:text-rda-500 focus:outline-none focus:ring-2 focus:ring-rda-500 focus:ring-offset-2"
          >
            <span className="sr-only">Close</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-500">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
}
