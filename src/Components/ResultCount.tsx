import React from "react";

const ResultCount = (props: any) => {
  return (
    <>
      <span> {props.resultCountFunction()}</span>
    </>
  );
};

export default ResultCount;
