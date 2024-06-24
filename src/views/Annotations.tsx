export default function Annotations() {
  return (
    <div className="relative h-full w-full flex flex-col">
      <div className="border-b border-gray-200 p-5">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Annotations
        </h3>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          The selected vocabularies will be added as options to tag new
          annotations.
        </p>
      </div>
      <div className="text-gray-500 flex flex-col justify-center items-center space-y-3 flex-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-10 text-rda-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
          />
        </svg>
        <div className="text-sm flex justify-center flex-col items-center space-y-1">
          <p className="text-gray-900">
            No annotations were found for this resource!
          </p>
          <p>Be the first to create an annotation.</p>
        </div>
        <button
          type="button"
          className="rounded-md bg-rda-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rda-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rda-500"
        >
          Create Annotation
        </button>
      </div>
    </div>
  );
}
