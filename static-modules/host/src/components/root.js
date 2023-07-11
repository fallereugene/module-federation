import React, { Suspense } from "react";
import { App } from "./app";
import { provider } from "../core";
import "../styles/app.css";

const RemoteApplication = React.lazy(() =>
  import("remoteApp/RemoteApplication")
);

export const Root = () => {
  const [isReady, setReadyState] = React.useState(false);

  return (
    <div>
      <h1>React App (Host)</h1>
      <App isReady={isReady} />
      <Suspense fallback={<div>Загрузка...</div>}>
        <RemoteApplication
          hostProvider={provider}
          registerRemoteApplication={() => setReadyState(true)}
        />
      </Suspense>
      <div />
    </div>
  );
};

export default Root;
