import React, { useEffect, useState } from "react";
import { useProvider } from "../context";

function Test() {
  const { shuffledWords } = useProvider();
  // console.log(shuffledWords);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState(shuffledWords[currentIndex]);
  const [options, setOptions] = useState([currentWord.meaning]);

  // set remaining options
  useEffect(() => {
    let tempWords = shuffledWords.filter((word) => word.id != currentWord.id);
    let tempOptions = [...options];
    console.log("shuffled", shuffledWords);
    console.log("temporary", tempWords);
    for (let i = 0; i < 3; i++) {
      let randomIndex = Math.floor(Math.random() * tempWords.length);
      console.log(tempWords[randomIndex].meaning);
      tempOptions.push(tempWords[randomIndex].meaning);
      console.log("before deleting", tempWords);
      tempWords.splice(randomIndex, 1);
      console.log("before deleting", tempWords);
    }
    setOptions(tempOptions);
  }, [currentIndex]);

  console.log("length of options", options.length);
  console.log(options);

  return (
    <div className="bg-dark" style={{ minHeight: "100vh" }}>
      <nav className="d-flex align-items-center justify-content-center bg-light py-3">
        <a
          href="/"
          className="text-decoration-none text-dark fw-normal text-capitalize"
          style={{ fontSize: "1.3rem" }}
        >
          word mentor
        </a>
      </nav>
      <div className="container d-flex align-items-center justify-content-center">
        <div className="rounded bg-light">
          <div className="bg-primary">
            <p className="text-white p-3">{`${currentIndex + 1}. ${
              shuffledWords[currentIndex].word
            }`}</p>
          </div>
          <div className="list-group">
            {options.map((option) => (
              <a href="#" className="list-group-item-action">
                {option}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Test;
