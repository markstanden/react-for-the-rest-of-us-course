import React from 'react';

function ExampleComponent(props) {
  return (
    <>
      <h1 className="example__header">Header: {props.header}</h1>
      <p className="example__body">Body text {props.body}</p>
      <small className="example__small-print">Small Print: {props.smallPrint}</small>
    </>
  );
}

export default ExampleComponent;
