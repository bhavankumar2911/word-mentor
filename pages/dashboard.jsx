import React, { useState } from "react";

const Dashboard = () => {
  const [Word, setWord] = useState("");
  const [Meaning, setMeaning] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Word, Meaning);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <section>
        <h2>add new word</h2>
        <form onSubmit={handleSubmit}>
          <label>Word</label>
          <input
            type="text"
            onChange={(e) => setWord(e.target.value)}
            value={Word}
          />
          <label>Meaning</label>
          <input
            type="text"
            onChange={(e) => setMeaning(e.target.value)}
            value={Meaning}
          />
          <button type="submit">add</button>
        </form>
      </section>
    </div>
  );
};

export default Dashboard;
