import React, { useState } from "react";
import Axios from "axios";
import { useProvider } from "../context";

const EditForm = () => {
  const { editId, editWord, editMeaning, setEditWord, setEditMeaning } =
    useProvider();
  const [flashMessage, setFlashMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.put(`/api/${editId}`, { editWord, editMeaning })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <h2>edit</h2>
        <p>{flashMessage}</p>
        <label>word</label>
        <input
          type="text"
          onChange={(e) => setEditWord(e.target.value)}
          value={editWord}
        />
        <label>meaning</label>
        <input
          type="text"
          onChange={(e) => setEditMeaning(e.target.value)}
          value={editMeaning}
        />
        <button type="submit">update</button>
      </form>
    </section>
  );
};

export default EditForm;
