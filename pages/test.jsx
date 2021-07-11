import React, { useEffect, useState } from "react";
import { useProvider } from "../context";
import styles from "../styles/Test.module.css";
import { useRouter } from "next/router";

function Test() {
  const { shuffledWords, responses, setResponses } = useProvider();
  const [displayData, setDisplayData] = useState([]);
  const router = useRouter();

  // when the test is completed
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/score");
  };

  // when user clicks an option
  const handleClick = (e) => {
    const element = e.target;
    const choices = Array.from(element.parentElement.children);

    // resetting the option color if already selected
    choices.forEach((choice) => {
      choice.classList.remove("bg-dark");
      choice.classList.remove("text-light");
    });

    // setting the color for selected option
    element.classList.add("bg-dark");
    element.classList.add("text-light");

    const id = parseInt(element.parentElement.parentElement.id);
    const meaning = element.innerText;
    const tempResponses = responses.filter((response) => response.id !== id);

    setResponses([...tempResponses, { id, meaning }]);
  };

  // creating four choices for each word
  useEffect(() => {
    // returning the user to home page if less than 4 words is selected selected
    if (shuffledWords.length < 4) router.push("/");

    let allChoices = [];
    let tempData = [];

    for (let i = 0; i < shuffledWords.length; i++) {
      allChoices.push([shuffledWords[i].meaning]);
      tempData.push({ word: shuffledWords[i].word, id: shuffledWords[i].id });

      let tempMeanings = shuffledWords
        .filter((word) => word.id != shuffledWords[i].id)
        .map((word) => word.meaning);

      for (let j = 0; j < 3; j++) {
        let randomIndex = Math.floor(Math.random() * tempMeanings.length);
        allChoices[i].push(tempMeanings[randomIndex]);
        tempMeanings.splice(randomIndex, 1);
      }

      // shuffling the choices
      for (let j = 0; j < allChoices[i].length; j++) {
        let randomIndex = Math.floor(Math.random() * allChoices[i].length);
        let temp = allChoices[i][j];
        allChoices[i][j] = allChoices[i][randomIndex];
        allChoices[i][randomIndex] = temp;
      }
    }
    for (let i = 0; i < tempData.length; i++) {
      tempData[i].choices = allChoices[i];
    }
    setDisplayData(tempData);
  }, []);

  return (
    <div className="bg-dark pb-5">
      <a
        className="text-center d-block text-capitalize text-light text-decoration-none py-4"
        style={{ fontSize: "1.2rem" }}
        href="/"
      >
        word mentor
      </a>
      <ul
        className="mx-auto"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {displayData.map((word) => (
          <li
            className="bg-white rounded w-50 rounded overflow-hidden mb-4"
            key={word.id}
            id={word.id}
          >
            <p className=" text-white text-capitalize py-3 text-center bg-primary">
              {word.word}
            </p>{" "}
            <span>
              {word.choices.map((choice) => (
                <p
                  className={`m-2 p-2 rounded choice ${styles.choice}`}
                  style={{ cursor: "pointer" }}
                  onClick={handleClick}
                >
                  {choice}
                </p>
              ))}
            </span>{" "}
          </li>
        ))}
      </ul>
      <div className="text-center w-100">
        <a
          href=""
          className="btn btn-primary text-capitalize"
          onClick={handleSubmit}
        >
          view score
        </a>
      </div>
    </div>
  );
}

export default Test;
