const pages = [
  { name: "Annotations", href: "#", current: true },
  // { name: "Project Nero", href: "#", current: true },
];

export default function Breadcrumbs() {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-1 italic">
        {pages.map((page, index) => (
          <li key={page.name}>
            <div className="flex items-center">
              <a
                href={page.href}
                className={`mr-1 text-sm text-white hover:text-gray-200 ${
                  page.current ? "font-medium" : "font-normal"
                }`}
                aria-current={page.current ? "page" : undefined}
              >
                {page.name}
              </a>
              {index < pages.length - 1 && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5 flex-shrink-0 text-white"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
