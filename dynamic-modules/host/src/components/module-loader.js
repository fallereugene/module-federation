import React, { Suspense } from "react";
import { useDynamicScript } from "../hooks";
import { loadComponent } from "../core";

export const ModuleLoader = (props) => {
  const { module, url, scope, hostProvider, registerRemoteApplication } = props;

  const { ready, failed } = useDynamicScript({
    url: module && url,
  });

  if (!module) {
    return <h2>Not system specified</h2>;
  }

  if (!ready) {
    return <h2>Loading dynamic script: {props.url}</h2>;
  }

  if (failed) {
    return <h2>Failed to load dynamic script: {props.url}</h2>;
  }

  const Component = React.lazy(loadComponent(scope, module));

  return (
    <Suspense fallback="Loading Module">
      <Component
        hostProvider={hostProvider}
        registerRemoteApplication={registerRemoteApplication}
      />
    </Suspense>
  );
};
