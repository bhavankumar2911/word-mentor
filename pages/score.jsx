import React, { useEffect } from "react";
import { useProvider } from "../context";

function Score() {
  const { score, evaluateScore } = useProvider();
  useEffect(evaluateScore, []);
  return <div>{score}</div>;
}

export default Score;
