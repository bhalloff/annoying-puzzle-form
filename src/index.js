import React, { useState, useEffect, useReducer } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const ChaseMe = ({ children, still = false }) => {
  const positionReducer = (state, action) => {
    switch (action.type) {
      case "next":
        return state === 1 ? 2 : 1;
      case "reset":
        return 0;
      default:
        throw new Error();
    }
  };
  const POSITIONS = [{ right: 0 }, { right: 100 }, { right: -100 }];
  const [position, dispatch] = useReducer(positionReducer, 0);

  useEffect(() => {
    let movement;
    if (!still) {
      // dispatch({type: 'next'});
      movement = setTimeout(() => {
        dispatch({ type: "next" });
      }, 1500);
    }
    return () => clearTimeout(movement);
  }, [position, still]);

  useEffect(() => {
    if (!still) {
      dispatch({ type: "next" });
    } else {
      dispatch({ type: "reset" });
    }
  }, [still]);

  return (
    <div
      style={{
        position: "relative",
        transition: "right 1s",
        ...POSITIONS[position]
      }}
    >
      {children}
    </div>
  );
};

function App() {
  const [motion, setMotion] = useState("moving");
  const radioProps = {
    type: "radio",
    name: "motion",
    onChange: e => setMotion(e.target.value)
  };
  const RadioMotion = ({ value }) => (
    <label>
      <input
        {...radioProps}
        id={`radio-${value}`}
        checked={motion === value}
        value={value}
      />
      {value}
    </label>
  );
  return (
    <div className="App">
      <h1>PuzzleForm</h1>
      <h2>It's kinda annoying</h2>
      <ChaseMe still={motion === "still"}>
        <RadioMotion value="motion" />
        <RadioMotion value="still" />
        <RadioMotion value="cruising" />
      </ChaseMe>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
