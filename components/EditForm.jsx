import React, { useState } from "react";
import Axios from "axios";
import { useProvider } from "../context";
import styles from "../styles/EditForm.module.css";

const EditForm = ({ showEditForm, setShowEditForm }) => {
  const {
    editId,
    editWord,
    editMeaning,
    setEditWord,
    setEditMeaning,
    updateWord,
  } = useProvider();
  const [flashMessage, setFlashMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.put(`/api/${editId}`, { word: editWord, meaning: editMeaning })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setEditWord("");
    setEditMeaning("");
    updateWord(editId, editWord, editMeaning);
    setShowEditForm(false);
    return;
  };

  const handleClick = (e) => {
    if (e.target.classList.contains(styles.formContainer))
      return setShowEditForm(false);
  };

  return (
    <section
      style={{ display: showEditForm ? "flex" : "none" }}
      className={styles.formContainer}
      onClick={handleClick}
    >
      <form
        onSubmit={handleSubmit}
        className={`rounded w-50 py-4 px-5 bg-white`}
        style={{ position: "relative" }}
      >
        <i
          class={`fas fa-times ${styles.times}`}
          onClick={() => setShowEditForm(false)}
        ></i>
        <h2
          className={`${styles.title} text-center my-4 fw-normal text-capitalize`}
        >
          edit
        </h2>
        <p>{flashMessage}</p>
        <label className="form-label text-capitalize">word</label>
        <input
          type="text"
          onChange={(e) => setEditWord(e.target.value)}
          value={editWord}
          className="form-control mb-3"
        />
        <label className="form-label text-capitalize">meaning</label>
        <input
          type="text"
          onChange={(e) => setEditMeaning(e.target.value)}
          value={editMeaning}
          className="form-control mb-3"
        />
        <button
          type="submit"
          className="btn btn-primary d-block mx-auto text-capitalize"
        >
          update
        </button>
      </form>
    </section>
  );
};

export default EditForm;
