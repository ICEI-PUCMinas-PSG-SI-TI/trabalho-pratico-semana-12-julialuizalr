async function carregarFilmes() {
  try {
    const resposta = await fetch("http://localhost:3000/filmes"); 
    const filmes = await resposta.json();

    const container = document.getElementById("recentes-container"); 
    filmes.forEach(filme => {
      container.appendChild(criarCard(filme));
    });

  } catch (erro) {
    console.error("Erro ao carregar filmes:", erro);
  }
}

function criarCard(filme) {
  const col = document.createElement("div");
  col.className = "col-md-3 mb-4";

  const card = document.createElement("div");
  card.className = "card h-100";

  const img = document.createElement("img");
  img.src = filme.imagem;
  img.className = "card-img-top";
  img.alt = filme.titulo;

  const body = document.createElement("div");
  body.className = "card-body d-flex flex-column";

  const title = document.createElement("h5");
  title.className = "card-title";
  title.textContent = filme.titulo;

  const genero = document.createElement("p");
  genero.className = "card-text";
  genero.textContent = filme.genero;

  const elenco = document.createElement("p");
  elenco.className = "card-text";
  elenco.textContent = filme.elenco;

  const tempo = document.createElement("p");
  tempo.className = "card-text";
  tempo.textContent = filme.tempo;

  const idade = document.createElement("p");
  idade.className = "card-text";
  idade.textContent = filme.idade;

  const link = document.createElement("a");
  link.href = `detalhes.html?id=${filme.id}`;
  link.className = "btn btn-primary mt-auto";
  link.textContent = "Ver detalhes";

  body.appendChild(title);
  body.appendChild(genero);
  body.appendChild(elenco);
  body.appendChild(tempo);
  body.appendChild(idade);
  body.appendChild(link);

  card.appendChild(img);
  card.appendChild(body);
  col.appendChild(card);

  return col;
}
// Função para criar um novo filme (POST)
async function criarFilme(filme) {
  const resposta = await fetch("http://localhost:3000/filmes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(filme)
  });
  return resposta.json();
}

// Função para buscar todos os filmes (GET)
async function buscarFilmes() {
  const resposta = await fetch("http://localhost:3000/filmes");
  return resposta.json();
}

// Função para atualizar um filme (PUT)
async function atualizarFilme(id, filmeAtualizado) {
  const resposta = await fetch(`http://localhost:3000/filmes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(filmeAtualizado)
  });
  return resposta.json();
}

// Função para deletar um filme (DELETE)
async function deletarFilme(id) {
  await fetch(`http://localhost:3000/filmes/${id}`, {
    method: "DELETE"
  });
}

// Função para pegar os dados do formulário
function getFilmeFormData() {
  return {
    titulo: document.getElementById("titulo").value,
    imagem: document.getElementById("imagem").value,
    genero: document.getElementById("genero").value,
    elenco: document.getElementById("elenco").value,
    tempo: document.getElementById("tempo").value,
    idade: document.getElementById("idade").value,
    sinopse: document.getElementById("sinopse").value,
    diretor: document.getElementById("diretor").value,
    trailer: document.getElementById("trailer").value
  };
}

// Função para preencher o formulário ao clicar em uma linha da tabela
function preencherFormulario(filme) {
  document.getElementById("filme-id").value = filme.id;
  document.getElementById("titulo").value = filme.titulo;
  document.getElementById("imagem").value = filme.imagem;
  document.getElementById("genero").value = filme.genero;
  document.getElementById("elenco").value = filme.elenco;
  document.getElementById("tempo").value = filme.tempo;
  document.getElementById("idade").value = filme.idade;
  document.getElementById("sinopse").value = filme.sinopse;
  document.getElementById("diretor").value = filme.diretor;
  document.getElementById("trailer").value = filme.trailer;
}

// Função para renderizar a tabela de filmes
function renderizarTabela(filmes) {
  const tabela = document.getElementById("tabela-filmes");
  tabela.innerHTML = "";
  filmes.forEach(filme => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${filme.titulo}</td>
      <td><img src="${filme.imagem}" alt="${filme.titulo}" style="width:60px; height:80px; object-fit:cover;"></td>
      <td>${filme.genero}</td>
      <td>${filme.elenco}</td>
      <td>${filme.tempo}</td>
      <td>${filme.idade}</td>
      <td>${filme.sinopse}</td>
      <td>${filme.diretor}</td>
      <td><a href="${filme.trailer}" target="_blank">Ver trailer</a></td>
    `;
    tr.onclick = function() {
      preencherFormulario(filme);
    };
    tabela.appendChild(tr);
  });
}

// Função para carregar todos os filmes na tabela
async function carregarFilmesTabela() {
  const filmes = await buscarFilmes();
  renderizarTabela(filmes);
}

// Função para cadastrar filme (chamada no submit do formulário)
async function handleCriar() {
  const filme = getFilmeFormData();
  await criarFilme(filme);
  alert("Filme cadastrado com sucesso!");
  document.getElementById("cadastro-filme").reset();
  document.getElementById("filme-id").value = "";
  carregarFilmesTabela();
}

// Função para atualizar filme
async function handleAtualizar() {
  const id = document.getElementById("filme-id").value;
  if (!id) {
    alert("Selecione um filme na tabela para atualizar.");
    return;
  }
  const filme = getFilmeFormData();
  await atualizarFilme(id, filme);
  alert("Filme atualizado com sucesso!");
  document.getElementById("cadastro-filme").reset();
  document.getElementById("filme-id").value = "";
  carregarFilmesTabela();
}

// Função para deletar filme
async function handleDeletar() {
  const id = document.getElementById("filme-id").value;
  if (!id) {
    alert("Selecione um filme na tabela para excluir.");
    return;
  }
  await deletarFilme(id);
  alert("Filme deletado com sucesso!");
  document.getElementById("cadastro-filme").reset();
  document.getElementById("filme-id").value = "";
  carregarFilmesTabela();
}

// Função para limpar o formulário
function handleLimpar() {
  document.getElementById("cadastro-filme").reset();
  document.getElementById("filme-id").value = "";
}

// EVENTOS
document.addEventListener("DOMContentLoaded", function() {
  carregarFilmesTabela();

  document.getElementById("cadastro-filme").addEventListener("submit", async function(event) {
    event.preventDefault();
    await handleCriar();
  });

  document.getElementById("btn-atualizar").onclick = handleAtualizar;
  document.getElementById("btn-excluir").onclick = handleDeletar;
  document.getElementById("btn-limpar").onclick = handleLimpar;
});