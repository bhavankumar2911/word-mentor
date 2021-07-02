import Axios from "axios";
import { useProvider } from "../context";

const WordItem = ({ data }) => {
  const { id, word, meaning, setShowEditForm } = data;
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
    <li className="list-group-item d-flex align-items-center justify-content-between p-4">
      <span>
        <h3
          className="text-capitalize fw-normal"
          style={{ fontSize: "1.3rem", fontWeight: "700" }}
        >
          {word}
        </h3>
        <p
          style={{
            fontStyle: "italic",
            fontSize: "0.9rem",
            maxWidth: "25rem",
            minWidth: "25rem",
          }}
        >
          {meaning}
        </p>
      </span>
      <span>
        <span
          onClick={() => {
            fillEditForm(id, word, meaning);
            setShowEditForm(true);
          }}
          className="btn btn-sm btn-primary rounded-circle d-inline-block m-2"
        >
          <i className="fas fa-pen"></i>
        </span>
        <span
          onClick={handleDelete}
          className="btn btn-sm btn-danger rounded-circle"
        >
          <i className="fas fa-trash"></i>
        </span>
      </span>
    </li>
  );
};

export default WordItem;
