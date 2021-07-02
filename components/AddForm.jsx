import { useState } from "react";
import Axios from "axios";
import { useProvider } from "../context";

const Addform = () => {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const { addWord } = useProvider();

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("/api", { word, meaning })
      .then((res) => {
        if (res.data.err) {
          return;
        }
        addWord(res.data.id, word, meaning);
        setWord("");
        setMeaning("");
        return;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="rounded mx-auto w-50 py-4 px-5 bg-white">
      <h2
        className="text-center fw-normal text-capitalize my-4"
        style={{ fontSize: "1.5rem" }}
      >
        add new word
      </h2>
      <form onSubmit={handleSubmit}>
        <label className="form-label">Word</label>
        <input
          type="text"
          onChange={(e) => setWord(e.target.value)}
          value={word}
          className="form-control mb-3"
        />
        <label className="form-label">Meaning</label>
        <input
          type="text"
          onChange={(e) => setMeaning(e.target.value)}
          value={meaning}
          className="form-control mb-3"
        />
        <button
          type="submit"
          className="btn d-block btn-primary mx-auto text-capitalize"
        >
          add
        </button>
      </form>
    </section>
  );
};

export default Addform;
