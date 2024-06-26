import { useContext } from "react";
import NavigationContext from "../context/NavigationContext";

export default function NavigationTabs() {
  const { navigationItems, setCurrent } = useContext(NavigationContext);

  const tabs = navigationItems.filter((item) => item.parent === undefined);

  return (
    <div>
      <nav className="isolate flex divide-x divide-gray-200" aria-label="Tabs">
        {tabs.map((tab) => (
          <p
            key={tab.label}
            className={`${
              tab.current
                ? "text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            } group relative min-w-0 flex-1 overflow-hidden bg-white px-2 py-2 text-center text-sm font-normal hover:bg-gray-50 focus:z-10`}
            aria-current={tab.current ? "page" : undefined}
            onClick={() => setCurrent(tab.tab)}
          >
            <span>{tab.label}</span>
            <span
              aria-hidden="true"
              className={`${
                tab.current ? "bg-rda-500" : "bg-transparent"
              } absolute inset-x-0 bottom-0 h-0.5`}
            />
          </p>
        ))}
      </nav>
    </div>
  );
}
