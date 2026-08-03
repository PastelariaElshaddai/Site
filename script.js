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

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let mensagem = "🛒 Seu Carrinho:\n\n";
    let total = 0;

    carrinho.forEach(produto => {
        mensagem += produto.nome + " - R$ " + produto.preco.toFixed(2) + "\n";
        total += produto.preco;
    });

    mensagem += "\n💰 Total: R$ " + total.toFixed(2);

    alert(mensagem);
}
