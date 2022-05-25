import React from "react";
import spin from "./spin.gif";
function Loading() {
  return (
    <>
      <img
        src={spin}
        alt="Loading..."
        style={{ width: "200px", margin: "auto", display: "block" }}
      />
    </>
  );
}

export default Loading;
