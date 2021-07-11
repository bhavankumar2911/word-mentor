import React, { useEffect, useState } from "react";
import { useProvider } from "../context";

function Score() {
  const { score, evaluateScore, shuffledWords, responses } = useProvider();
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    evaluateScore();
    let tempReviews = [];
    shuffledWords.forEach((word) => {
      responses.forEach((response) => {
        if (word.id == response.id) {
          tempReviews.push({
            id: word.id,
            word: word.word,
            correctMeaning: word.meaning,
            yourResponse: response.meaning,
          });
        }
      });
    });
    setReviews(tempReviews);
  }, []);
  return (
    <div>
      <nav className="text-center py-3 bg-dark">
        <a
          href="/"
          className="text-decoration-none text-capitalize text-light"
          style={{ fontSize: "1.2rem" }}
        >
          word mentor
        </a>
      </nav>
      <div className="container text-center my-5">
        <div className="bg-success rounded p-4 w-50 mx-auto">
          <h1
            className="text-capitalize text-light"
            style={{ fontWeight: "700" }}
          >
            your score
          </h1>
          <h3 className="text-light">
            {score}/{shuffledWords.length}
          </h3>
        </div>
        <h2 className="text-capitalize my-5">your response</h2>
        <ul className="list-group">
          {reviews.map((review) => (
            <li className="list-group-item p-3" style={{ textAlign: "left" }}>
              <h4
                className={
                  "d-inline-block rounded p-2 text-light fw-normal text-capitalize" +
                  (review.correctMeaning == review.yourResponse
                    ? " bg-success"
                    : " bg-danger")
                }
                style={{ fontSize: "1rem" }}
              >
                {review.word}
              </h4>
              <p>Correct meaning: {review.correctMeaning}</p>
              <p>Your response: {review.yourResponse}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Score;
