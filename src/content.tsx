import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import App from "./App";
import { NavigationProvider } from "./context/NavigationProvider";
import { ConfigProvider } from "./context/ConfigProvider";

const root = () => {
  const headLink = document.createElement("link");
  headLink.rel = "preload";
  headLink.as = "style";
  headLink.href = chrome.runtime.getURL("assets/rawr-style.css");
  document.head.appendChild(headLink);

  const extension = document.createElement("rawr-extension");
  const shadowRoot = extension.attachShadow({ mode: "open" });
  const shadowLink = document.createElement("link");
  const root = document.createElement("div");

  shadowLink.rel = "stylesheet";
  shadowLink.href = chrome.runtime.getURL("assets/rawr-style.css");
  shadowRoot.appendChild(shadowLink);

  root.id = "root";
  shadowRoot.appendChild(root);

  document.documentElement.appendChild(extension);

  return root;
};

document.body.style.transition = "margin-right 300ms ease-in-out";
document.body.style.marginRight = "0px";

export const toggleBodyMarginRight = (open: boolean) => {
  document.body.style.marginRight = open ? "432px" : "0px";
};

const ContentScript = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const messageListener = (
      request: any,
      __: chrome.runtime.MessageSender,
      sendResponse: (response?: any) => void
    ) => {
      if (request.action === "check") {
        sendResponse({ status: "injected" });
      } else if (request.action === "ON") {
        setIsVisible(true);
      } else if (request.action === "OFF") {
        setIsVisible(false);
      }
      return true;
    };

    chrome.runtime.onMessage.addListener(messageListener);

    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  return (
    <div style={{ display: isVisible ? "block" : "none" }}>
      <ConfigProvider>
        <NavigationProvider>
          <App isVisible={isVisible} />
        </NavigationProvider>
      </ConfigProvider>
    </div>
  );
};

ReactDOM.createRoot(root()).render(
  <React.StrictMode>
    <ContentScript />
  </React.StrictMode>
);
