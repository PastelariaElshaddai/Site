let carrinho = [];

function adicionar(nome, preco){

    carrinho.push({
        nome:nome,
        preco:preco
    });

    alert(nome + " foi adicionado ao carrinho!");

}
function verCarrinho() {
    alert("Em breve o carrinho será aberto aqui!");
}
let quantidade = 0;

function adicionarCarrinho() {
    quantidade++;

    document.getElementById("contador").innerHTML = quantidade;
}
