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
    <section className='bg-light rounded mx-auto w-50 py-4 px-5' style={{border:'1px solid #ccc'}}> 
      <h2 className='text-center fw-normal text-capitalize my-4' style={{fontSize:'1.5rem'}}>add new word</h2>
      <form onSubmit={handleSubmit}>
        <p>{flashMessage}</p>
        <label className='form-label'>Word</label>
        <input
          type="text"
          onChange={(e) => setWord(e.target.value)}
          value={word}
          className='form-control mb-3'
        />
        <label className='form-label'>Meaning</label>
        <input
          type="text"
          onChange={(e) => setMeaning(e.target.value)}
          value={meaning}
          className='form-control mb-3'
        />
        <button type="submit" className='btn d-block btn-primary mx-auto text-capitalize'>add</button>
      </form>
    </section>
  );
};

export default Addform;
