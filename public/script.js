async function cadastrar() {
  try {
    const drt = document.getElementById("drt").value;
    const nome = document.getElementById("nome").value;
    const setor = document.getElementById("setor").value;

    const resposta = await fetch("http://localhost:3000/professores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ drt, nome, setor })
    });

    const texto = await resposta.text();
    console.log(texto);

    await listar(); 

  } catch (erro) {
    console.error(erro);
  }
}


async function listar() {
  const resposta = await fetch("http://localhost:3000/professores");
  const dados = await resposta.json();

  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  dados.forEach(p => {
    lista.innerHTML += `<li>${p.nome} - ${p.setor}</li>`;
  });
}

async function buscarPorDrt() {
  const drt = document.getElementById("drt").value;

  const resposta = await fetch("http://localhost:3000/professores");
  const dados = await resposta.json();

  const encontrado = dados.find(p => p.drt === drt);

  const lista = document.getElementById("listaProfessores");
  lista.innerHTML = "";

  if (encontrado) {
    lista.innerHTML = `<li>${encontrado.nome} - ${encontrado.setor}</li>`;
  } else {
    lista.innerHTML = `<li>Professor não encontrado</li>`;
  }
}

async function editar() {
  const drt = document.getElementById("drt").value;
  const nome = document.getElementById("nome").value;
  const setor = document.getElementById("setor").value;

  const resposta = await fetch("http://localhost:3000/professores");
  const dados = await resposta.json();

  const professor = dados.find(p => p.drt === drt);

  if (!professor) {
    alert("Professor não encontrado");
    return;
  }

  await fetch(`http://localhost:3000/professores/${professor._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ drt, nome, setor })
  });

  alert("Atualizado!");
  await listar();
}

async function excluir() {
  const drt = document.getElementById("drt").value;

  const resposta = await fetch("http://localhost:3000/professores");
  const dados = await resposta.json();

  const professor = dados.find(p => p.drt === drt);

  if (!professor) {
    alert("Professor não encontrado");
    return;
  }

  console.log("ID encontrado:", professor._id);

  await fetch(`http://localhost:3000/professores/${professor._id}`, {
    method: "DELETE"
  });

  alert("Excluído!");

  await listar(); 
}
window.onload = listar;