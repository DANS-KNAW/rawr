import React from "react";
import ReactDOM from "react-dom/client";

function injectExtensionElement() {
  const extensionElement = document.createElement("rawr-extension");
  const shadowRoot = extensionElement.attachShadow({ mode: "open" });
  const root = document.createElement("div");

  root.id = "root";
  shadowRoot.appendChild(root);

  document.documentElement.appendChild(extensionElement);

  return root;
}

const root = injectExtensionElement();

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <h1>Hello World!</h1>
  </React.StrictMode>
);
