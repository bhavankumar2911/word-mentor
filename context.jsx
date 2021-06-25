import React, { createContext, useState, useContext, useEffect } from "react";
import Axios from "axios";

const context = createContext(null);

const ContextProvider = ({ children }) => {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editWord, setEditWord] = useState("");
  const [editMeaning, setEditMeaning] = useState("");
  const [editId, setEditId] = useState(null);

  const addWord = (id, word, meaning) => {
    setWords([...words, { id, word, meaning }]);
    return;
  };

  const deleteWord = (id) => {
    const tempData = words.filter((word) => word.id != id);
    setWords(tempData);
    return;
  };

  const fillEditForm = (id, word, meaning) => {
    setEditId(id);
    setEditWord(word);
    setEditMeaning(meaning);
    return;
  };

  const fetchData = () => {
    Axios.get("/api")
      .then((res) => {
        setLoading(false);
        if (res.data.err) {
          alert("Something went wrong");
          return;
        }
        setWords(res.data);
        return;
      })
      .catch((err) => {
        setLoading(false);
        alert("Something went wrong");
        return;
      });
  };

  useEffect(fetchData, []);

  return (
    <context.Provider
      value={{
        words,
        loading,
        addWord,
        deleteWord,
        fillEditForm,
        editWord,
        editMeaning,
        editId,
        setEditWord,
        setEditMeaning,
      }}
    >
      {children}
    </context.Provider>
  );
};

export const useProvider = () => {
  return useContext(context);
};

export default ContextProvider;
