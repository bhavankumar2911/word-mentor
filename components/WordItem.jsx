import Axios from "axios";
import { useProvider } from "../context";

const WordItem = ({ data }) => {
  const { id, word, meaning } = data;
  const { deleteWord, fillEditForm } = useProvider();
  const handleDelete = () => {
    Axios.delete(`/api/${id}`)
      .then((res) => {
        deleteWord(id);
        console.log(res.data);
        return;
      })
      .catch((err) => console.log(err));
  };
  return (
    <span>
      <h3>{word}</h3>
      <p>{meaning}</p>
      <span onClick={() => fillEditForm(id, word, meaning)}>
        <i className="fas fa-pen"></i>
      </span>
      <span onClick={handleDelete}>
        <i className="fas fa-trash"></i>
      </span>
    </span>
  );
};

export default WordItem;
