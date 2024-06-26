import { createContext } from "react";

export interface NavigationItem {
  parent?: string;
  label?: string;
  current: boolean;
  tab: string;
}

export interface NavigationContextType {
  navigationItems: NavigationItem[];
  setCurrent: (tab: string) => void;
}

// Create the context
const NavigationContext = createContext<NavigationContextType>({
  navigationItems: [] as NavigationItem[],
  setCurrent: (tab: string) => {tab;},
});


export default NavigationContext;
