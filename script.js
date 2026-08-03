let carrinho = [];
let quantidade = 0;

function adicionarProduto(nome, preco) {
  carrinho.push({
    nome: nome,
    preco: preco
  });

  quantidade++;
  document.getElementById("contador").innerHTML = quantidade;

  alert(nome + " foi adicionado ao carrinho!");
}

function verCarrinho() {
  alert("Em breve o carrinho será aberto!");
}
