import { Fragment, useContext, useEffect, useState } from "react";
import Topbar from "./components/Topbar";
import Form from "./views/Form";
import Settings from "./views/Settings";
import NavigationContext from "./context/NavigationContext";
import Annotations from "./views/Annotations";
import { toggleBodyMarginRight } from "./content";

export default function App({ isVisible }: { isVisible: boolean }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { navigationItems } = useContext(NavigationContext);

  const handleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    toggleBodyMarginRight(!isSidebarOpen);
  };

  useEffect(() => {
    if (!isVisible) {
      setIsSidebarOpen(false);
      toggleBodyMarginRight(false);
    }
  }, [isVisible]);

  return (
    <div
      className={`fixed top-0 z-[999999999999] -right-[calc(432px-4px)] transition ease-in-out duration-300 ${
        isSidebarOpen ? "-translate-x-[calc(432px-4px)]" : "translate-x-0"
      }`}
    >
      <div className="w-112 h-screen flex flex-col">
        <Topbar handleSidebar={handleSidebar} isSidebarOpen={isSidebarOpen} />
        <main className="bg-gray-100 h-full w-full relative overflow-y-scroll">
          {navigationItems.map((item) => (
            <Fragment>
              {item.current && item.tab === "annotations" && <Annotations />}
              {item.current && item.tab === "form" && <Form />}
              {item.current && item.tab === "about" && <Annotations />}
              {item.current && item.tab === "settings" && <Settings />}
            </Fragment>
          ))}
        </main>
      </div>
    </div>
  );
}
