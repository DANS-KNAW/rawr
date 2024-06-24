import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import App from "./App";
import { NavigationProvider } from "./context/NavigationProvider";

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

ReactDOM.createRoot(root()).render(
  <React.StrictMode>
    <NavigationProvider>
      <App />
    </NavigationProvider>
  </React.StrictMode>
);
