import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";

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
    <h1 className="text-4xl text-amber-400 font-black">Hello World!</h1>
  </React.StrictMode>
);
