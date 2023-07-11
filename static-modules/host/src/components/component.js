import React from "react";

export const Component = () => {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const { ee } = window.hostApplication;
    ee.emit("hostChangeCount", value);
  }, []);

  React.useEffect(() => {
    const { ee } = window.hostApplication;
    ee.emit("hostChangeCount", value);
  }, [value]);

  return (
    <div
      style={{
        padding: 20,
        outline: "1px dashed red",
        marginBottom: "10px",
      }}
    >
      Component from HOST app.
      <div>Current count: {value}</div>
      <button onClick={() => setValue(value + 1)}>increment count</button>
    </div>
  );
};
