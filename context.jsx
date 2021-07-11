import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useReducer,
} from "react";
import Axios from "axios";
import Reducer from "./Reducer";

const context = createContext(null);

const ContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [editWord, setEditWord] = useState("");
  const [editMeaning, setEditMeaning] = useState("");
  const [editId, setEditId] = useState(null);
  const [words, dispatch] = useReducer(Reducer, []);
  const [shuffledWords, setShuffledWords] = useState([]);
  const [responses, setResponses] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const addWord = (id, word, meaning) => {
    console.log(id);
    dispatch({ type: "ADD_WORD", payload: { id, word, meaning } });
  };

  const shuffleWords = () => {
    let tempWords = [...words];
    for (let i = 0; i < tempWords.length; i++) {
      let randomIndex = Math.floor(Math.random() * tempWords.length);
      let tempWord = tempWords[i];
      tempWords[i] = tempWords[randomIndex];
      tempWords[randomIndex] = tempWord;
    }
    return tempWords;
  };

  const prepareTest = (numberOfWords) => {
    let tempWords = shuffleWords().slice(0, numberOfWords);
    setShuffledWords(tempWords);
  };

  const deleteWord = (id) => dispatch({ type: "DELETE_WORD", payload: id });

  const updateWord = (id, word, meaning) =>
    dispatch({ type: "UPDATE_WORD", payload: { id, word, meaning } });

  const fillEditForm = (id, word, meaning) => {
    setEditId(id);
    setEditWord(word);
    setEditMeaning(meaning);
    return;
  };

  const evaluateScore = () => {
    let tempScore = score;
    shuffledWords.forEach((word) => {
      responses.forEach((response) => {
        if (word.id == response.id) {
          console.table(word);
          console.table(response);
          console.log(word.meaning);
          console.log(response.meaning);
          if (word.meaning == response.meaning) {
            console.log("correct");
            tempScore++;
          }
        }
      });
    });
    console.log(tempScore);
    setScore(tempScore);
  };
  console.log(score);

  const fetchData = () => {
    Axios.get("/api")
      .then((res) => {
        setLoading(false);
        if (res.data.err) {
          alert("Something went wrong");
          return;
        }
        dispatch({ type: "INITIATE_DATA", payload: res.data });
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
        updateWord,
        prepareTest,
        shuffledWords,
        answers,
        setAnswers,
        responses,
        setResponses,
        score,
        evaluateScore,
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
