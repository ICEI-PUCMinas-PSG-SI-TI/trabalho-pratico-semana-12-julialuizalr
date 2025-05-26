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
