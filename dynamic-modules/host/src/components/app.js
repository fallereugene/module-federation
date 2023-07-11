import React from "react";
import { Component } from "./component";

export const App = (props) => {
  const { isReady } = props;

  if (!isReady) {
    return null;
  }

  return <Component />;
};
