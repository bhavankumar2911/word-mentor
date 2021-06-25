import { useState } from "react";
import Axios from "axios";
import { useProvider } from "../context";

const Addform = () => {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [flashMessage, setFlashMessage] = useState("");
  const { addWord } = useProvider();

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("/api", { word, meaning })
      .then((res) => {
        if (res.data.err) {
          setTimeout(() => setFlashMessage(""), 4000);
          setFlashMessage("Word not added - something went wrong");
          return;
        }
        setTimeout(() => setFlashMessage(""), 2000);
        setFlashMessage(res.data.message);
        addWord(res.data.id, word, meaning);
        return;
      })
      .catch((err) => {
        console.log(err);
        setFlashMessage("Word not added - something went wrong");
      });
  };

  return (
    <section>
      <h2>add new word</h2>
      <form onSubmit={handleSubmit}>
        <p>{flashMessage}</p>
        <label>Word</label>
        <input
          type="text"
          onChange={(e) => setWord(e.target.value)}
          value={word}
        />
        <label>Meaning</label>
        <input
          type="text"
          onChange={(e) => setMeaning(e.target.value)}
          value={meaning}
        />
        <button type="submit">add</button>
      </form>
    </section>
  );
};

export default Addform;
