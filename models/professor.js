const mongoose = require('mongoose');

const ProfessorSchema = new mongoose.Schema({
  drt: { type: String, unique: true, required: true },
  nome: String,
  setor: String,
});

module.exports = mongoose.model('Professor', ProfessorSchema);