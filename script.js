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
function enviarWhatsApp() {

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }
let nome = prompt("Qual é o seu nome?");
let tipoPedido = prompt("Digite:\n1 - Entrega\n2 - Retirada");

let endereco = "";

if (tipoPedido == "1") {
    endereco = prompt("Digite seu endereço:");
}
let mensagem = "Olá! Meu nome é " + nome + ".%0A%0AGostaria de fazer este pedido:%0A%0A";
    let total = 0;

    carrinho.forEach(produto => {
        mensagem += "• " + produto.nome + " - R$ " + produto.preco.toFixed(2) + "%0A";
        total += produto.preco;
    });

    mensagem += "%0A💰 Total: R$ " + total.toFixed(2);

    window.open("https://wa.me/?text=" + mensagem, "_blank");
}
