import { ReactNode, useState } from "react";
import NavigationContext, { NavigationItem } from "./NavigationContext";

export const NavigationProvider = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([
    { label: "Annotations", current: false, tab: "form" },
    { label: "About", current: true, tab: "about" },
    { label: "Settings", current: false, tab: "settings" },
  ]);

  // Function to set one navigation item to current and all others to false
  const setCurrent = (tab: string) => {
    setNavigationItems((items) =>
      items.map((item) =>
        item.tab === tab
          ? { ...item, current: true }
          : { ...item, current: false }
      )
    );
  };

  return (
    <NavigationContext.Provider value={{ navigationItems, setCurrent }}>
      {children}
    </NavigationContext.Provider>
  );
};
