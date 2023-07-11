import React from "react";
import { Component } from "./component";

import "../styles/App.css";

const App = (props) => {
  const { hostProvider, registerRemoteApplication } = props;

  React.useEffect(() => {
    typeof registerRemoteApplication === "function" &&
      registerRemoteApplication();
  }, []);

  return (
    <div>
      <h1>React App (Remote)</h1>
      <Component hostProvider={hostProvider} />
    </div>
  );
};

export default App;
