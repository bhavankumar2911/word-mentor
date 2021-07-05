import React, { useEffect, useState } from "react";
import { useProvider } from "../context";
import Head from "next/head";

function Test() {
  const { shuffledWords } = useProvider();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState(shuffledWords[currentIndex]);
  const [options, setOptions] = useState([currentWord.meaning]);
  const [shuffledOptions, setShuffledOptions] = useState([]);

  // set remaining options
  useEffect(() => {
    let tempWords = shuffledWords.filter((word) => word.id != currentWord.id);
    let tempOptions = [...options];
    for (let i = 0; i < 3; i++) {
      let randomIndex = Math.floor(Math.random() * tempWords.length);
      tempOptions.push(tempWords[randomIndex].meaning);
      tempWords.splice(randomIndex, 1);
    }
    // shuffling the options
    for (let i = 0; i < tempOptions.length; i++) {
      let randomIndex = Math.floor(Math.random() * tempOptions.length);
      let temp = tempOptions[i];
      tempOptions[i] = tempOptions[randomIndex];
      tempOptions[randomIndex] = temp;
    }
    setShuffledOptions(tempOptions);
  }, [currentIndex]);

  const handleSelect = (e) => {
    console.log(e.target.innerHTML);
  };

  return (
    <div
      className="bg-dark"
      style={{
        height: "100vh",
        display: "grid",
        gridTemplateRows: "50px 1fr",
      }}
    >
      <Head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>
      <nav className="bg-light text-center py-3">
        <a href="/" className="text-capitalize text-dark text-decoration-none">
          word mentor
        </a>
      </nav>
      <div className="container d-flex align-items-center justify-content-center">
        <dv className="bg-white overflow-hidden rounded">
          <div className="bg-primary py-3 d-flex align-items-center justify-content-between text-white">
            <i class="material-icons d-inline-block mx-3">chevron_left</i>
            <p className="text-capitalize m-0">{currentWord.word}</p>
            <i class="material-icons d-inline-block mx-3">chevron_right</i>
          </div>
          <ul className="list-group" style={{ padding: "1rem 1rem 0 1rem" }}>
            {shuffledOptions.map((option) => (
              <a
                href="#"
                className="list-group-item-action text-decoration-none mb-3 bg-light rounded px-1 py-3"
                onClick={handleSelect}
              >
                {option}
              </a>
            ))}
          </ul>
        </dv>
      </div>
    </div>
  );
}

export default Test;
