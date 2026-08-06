let carrinho = [];
let quantidade = 0;

function adicionarProduto(nome, preco) {
  carrinho.push({
    nome: nome,
    preco: preco
  });
localStorage.setItem("carrinho", JSON.stringify(carrinho));
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
let mensagem = "Olá! Meu nome é " + nome + ".\n";

if (tipoPedido == "1") {
    mensagem += "📦 Pedido para ENTREGA\n";
    mensagem += "📍 Endereço: " + endereco + "\n\n";
} else {
    mensagem += "🛍️ Pedido para RETIRADA\n\n";
}

mensagem += "Gostaria de fazer este pedido:\n\n";
    let total = 0;

    carrinho.forEach(produto => {
        mensagem += "• " + produto.nome + " - R$ " + produto.preco.toFixed(2) + "\n";
        total += produto.preco;
    });

    mensagem += "\n💰 Total: R$ " + total.toFixed(2);

    location.href = "https://wa.me/5585988944421?text=" + encodeURIComponent(mensagem);
}
function irParaPedido() {

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    window.location.href = "pedido.html";

}
