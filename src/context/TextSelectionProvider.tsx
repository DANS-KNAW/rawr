import { ReactNode, createContext, useEffect, useState } from "react";
import TextSelectionHandler from "../lib/text-selector";

export const TextSelectionContext = createContext<string | null>(null);

const TextSelectionProvider = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  const [selection, setSelection] = useState<string | null>(null);

  useEffect(() => {
    const textSelection = new TextSelectionHandler(setSelection);

    return () => {
      textSelection.cleanup();
    };
  }, []);

  return (
    <TextSelectionContext.Provider value={selection}>
      {children}
    </TextSelectionContext.Provider>
  );
};

export default TextSelectionProvider;
