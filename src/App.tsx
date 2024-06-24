import { Fragment, useContext, useState } from "react";
import Topbar from "./components/Topbar";
import Form from "./views/Form";
import Settings from "./views/Settings";
import NavigationContext from "./context/NavigationContext";
import Annotations from "./views/Annotations";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { navigationItems } = useContext(NavigationContext);

  const handleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={`fixed top-0 z-[999999999999] -right-[calc(27rem-4px)] transition ease-in-out duration-300 ${
        isSidebarOpen ? "-translate-x-[calc(27rem-4px)]" : "translate-x-0"
      }`}
    >
      <div className="w-[28rem] h-screen flex flex-col">
        <Topbar handleSidebar={handleSidebar} isSidebarOpen={isSidebarOpen} />
        <main className="bg-gray-100 h-full w-full relative overflow-y-scroll">
          {navigationItems.map((item) => (
            <Fragment>
              {item.current && item.tab === "annotations" && <Annotations />}
              {item.current && item.tab === "form" && <Form />}
              {item.current && item.tab === "settings" && <Settings />}
            </Fragment>
          ))}
        </main>
      </div>
    </div>
  );
}
