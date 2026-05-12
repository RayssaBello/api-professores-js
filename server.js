const mongoose = require('mongoose');
const express = require('express');
const app = express();

const PORT = 3000;


const Professor = require('./models/Professor');

app.use(express.json());
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/professores')
  .then(() => console.log('MongoDB conectado!!!'))
  .catch(err => console.error(err));

app.get('/professores', async (req, res) => {
  const lista = await Professor.find();
  res.json(lista);
});

app.post('/professores', async (req, res) => {
  try {
    const { drt, nome, setor } = req.body;

    const novoProfessor = new Professor({ drt, nome, setor });
    await novoProfessor.save();

    res.send('Cadastrado!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
app.put('/professores/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { drt, nome, setor } = req.body;

const atualizado = await Professor.findByIdAndUpdate(
  id,
  { drt, nome, setor },
  { returnDocument: 'after' }
);
    if (!atualizado) {
      return res.status(404).send('Professor não encontrado');
    }

    res.send('Atualizado com sucesso!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao atualizar');
  }
});
app.delete('/professores/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletado = await Professor.findByIdAndDelete(id);

    if (!deletado) {
      return res.status(404).send('Professor não encontrado');
    }

    res.send('Excluído com sucesso!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao excluir');
  }
});