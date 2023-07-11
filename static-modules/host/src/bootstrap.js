import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./components/root.js";
import { provider } from "./core";
import { ErrorBoundary } from "./components/error-boundary.js";

provider.init();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ErrorBoundary>
    <Root />
  </ErrorBoundary>
);
