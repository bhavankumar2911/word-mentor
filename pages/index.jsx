import React, { useState } from "react";
import { useProvider } from "../context";
import { useRouter } from "next/router";

export default function Home() {
  // next router for directing users to test page
  const router = useRouter();
  const [numberOfWords, setNumberOfWords] = useState(0);
  const { prepareTest } = useProvider();
  const handleSubmit = (e) => {
    e.preventDefault();
    prepareTest(numberOfWords);
    router.push("/test");
  };
  return (
    <div
      className="bg-dark d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <div>
        <a
          href="/"
          className="text-light text-capitalize text-decoration-none text-center d-block my-3"
          style={{ fontSize: "3rem" }}
        >
          word mentor
        </a>
        <form className="text-center" onSubmit={handleSubmit}>
          <input
            type="number"
            className="form-control w-75 mx-auto mb-3"
            placeholder="Number of words"
            min={4}
            onChange={(e) => setNumberOfWords(e.target.value)}
            autoFocus={true}
          />
          <button type="submit" className="btn btn-primary text-capitalize">
            take test
          </button>
        </form>
      </div>
    </div>
  );
}
