import { useState } from "react";
import Topbar from "./components/Topbar";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={`fixed top-0 z-[999999999999] -right-[calc(27rem-4px)] transition ease-in-out duration-300 ${
        isSidebarOpen ? "-translate-x-[calc(27rem-4px)]" : "translate-x-0"
      }`}
    >
      <div className="w-[28rem] h-screen">
        <Topbar handleSidebar={handleSidebar} isSidebarOpen={isSidebarOpen} />
        <main className="bg-gray-200 px-5 h-full w-full">
          <h1 className="font-bold">RDA Sidebar</h1>
        </main>
      </div>
    </div>
  );
}