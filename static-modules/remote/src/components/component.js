import React from "react";

export const Component = ({ hostProvider }) => {
  const [value, setValue] = React.useState(null);

  React.useEffect(() => {
    if (hostProvider) {
      const { ee } = window[hostProvider.name];
      ee.on("hostChangeCount", setValue, {});
    }

    return () => {
      if (hostProvider) {
        const { ee } = window[hostProvider.name];
        ee.off("hostChangeCount", setValue);
      }
    };
  }, []);

  return (
    <div
      style={{
        padding: 20,
        outline: "1px dashed blue",
        marginBottom: "10px",
      }}
    >
      Component from REMOTE app
      <div>Value from host app: {value}</div>
    </div>
  );
};
