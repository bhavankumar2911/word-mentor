const model = require("./model");

const addWord = (req, res) => {
  const { word, meaning } = req.body;
  model
    .create({ word, meaning })
    .then((result) => res.send({ id: result.id, message: "word added" }))
    .catch((err) => res.send({ err }));
};

const deleteWord = (req, res) => {
  const id = req.params.id;
  model
    .destroy({ where: { id } })
    .then(() => res.send("word deleted"))
    .catch((err) => res.send({ err }));
};

const updateWord = (req, res) => {
  const id = req.params.id;
  const { word, meaning } = req.body;
  model
    .update({ word, meaning }, { where: { id } })
    .then(() => res.send("changed"))
    .catch((err) => res.send({ err }));
};

const fetchWords = (req, res) => {
  model
    .findAll()
    .then((data) => res.send(data))
    .catch((err) => res.send({ err }));
};

module.exports.addWord = addWord;
module.exports.deleteWord = deleteWord;
module.exports.updateWord = updateWord;
module.exports.fetchWords = fetchWords;
