let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];


// ==========================================
// ATUALIZAR CONTADOR
// ==========================================

function atualizarContador() {
    const contador = document.getElementById("contador");

    if (contador) {
        contador.innerHTML = carrinho.length;
    }
}


// ==========================================
// SALVAR CARRINHO
// ==========================================

function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    atualizarContador();
}


// ==========================================
// ADICIONAR PRODUTO
// ==========================================

function adicionarProduto(nome, preco) {

    carrinho.push({
        nome: nome,
        preco: Number(preco)
    });

    salvarCarrinho();
}


// ==========================================
// ABRIR CARRINHO
// ==========================================

function verCarrinho() {

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio.");
        return;
    }

    let grupos = {};

    carrinho.forEach(function(produto) {

        let chave = produto.nome + "|" + produto.preco;

        if (!grupos[chave]) {

            grupos[chave] = {
                nome: produto.nome,
                preco: Number(produto.preco),
                quantidade: 0
            };
        }

        grupos[chave].quantidade++;
    });


    // FUNDO ESCURO
    let fundo = document.createElement("div");

    fundo.id = "fundoCarrinho";

    fundo.style.cssText = `
        position:fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background:rgba(0,0,0,0.65);
        display:flex;
        justify-content:center;
        align-items:center;
        z-index:9999;
        padding:15px;
        box-sizing:border-box;
    `;


    // CAIXA DO CARRINHO
    let caixa = document.createElement("div");

    caixa.style.cssText = `
        background:linear-gradient(180deg,#fff8e8 0%,#fff1cf 100%);
        width:100%;
        max-width:450px;
        max-height:85vh;
        overflow:auto;
        border-radius:22px;
        padding:22px;
        box-sizing:border-box;
        border:3px solid #ffb800;
        box-shadow:0 10px 35px rgba(0,0,0,0.35);
        font-family:Arial,sans-serif;
    `;


    // TÍTULO
    let titulo = document.createElement("h2");

    titulo.innerHTML = "🛒 Seu Carrinho";

    titulo.style.cssText = `
        margin-top:0;
        color:#c62828;
        font-size:28px;
        text-align:center;
    `;

    caixa.appendChild(titulo);


    let total = 0;


    // PRODUTOS
    Object.values(grupos).forEach(function(produto) {

        total += produto.preco * produto.quantidade;

        let item = document.createElement("div");

        item.style.cssText = `
            background:#ffffff;
            border-radius:14px;
            padding:15px;
            margin-bottom:12px;
            border:2px solid #ffd166;
            box-shadow:0 3px 8px rgba(0,0,0,0.08);
        `;


        item.innerHTML = `

            <strong style="
                color:#333;
                font-size:19px;
            ">
                ${produto.nome}
            </strong>

            <br>

            <span style="
                color:#555;
                font-size:16px;
            ">
                R$ ${produto.preco.toFixed(2)} cada
            </span>

            <br><br>


            <button
                onclick="diminuirProduto('${produto.nome}', ${produto.preco})"
                style="
                    background:#ffb800;
                    border:0;
                    border-radius:8px;
                    padding:8px 14px;
                    font-size:20px;
                    font-weight:bold;
                    cursor:pointer;
                "
            >
                −
            </button>


            <strong style="
                margin:0 15px;
                font-size:19px;
            ">
                ${produto.quantidade}
            </strong>


            <button
                onclick="aumentarProduto('${produto.nome}', ${produto.preco})"
                style="
                    background:#ffb800;
                    border:0;
                    border-radius:8px;
                    padding:8px 14px;
                    font-size:20px;
                    font-weight:bold;
                    cursor:pointer;
                "
            >
                +
            </button>


            <button
                onclick="removerProduto('${produto.nome}', ${produto.preco})"
                style="
                    margin-left:10px;
                    background:#d62828;
                    color:white;
                    border:0;
                    border-radius:8px;
                    padding:9px 12px;
                    font-weight:bold;
                    cursor:pointer;
                "
            >
                Remover
            </button>
        `;


        caixa.appendChild(item);
    });


    // TOTAL
    let totalTexto = document.createElement("h2");

    totalTexto.innerHTML =
        "💰 Total: R$ " + total.toFixed(2);

    totalTexto.style.cssText = `
        color:#c62828;
        text-align:center;
        border-top:2px solid #ffcc66;
        padding-top:15px;
        margin-top:15px;
    `;

    caixa.appendChild(totalTexto);


    // FAZER PEDIDO
    let finalizar = document.createElement("button");

    finalizar.innerHTML = "📦 Fazer pedido";

    finalizar.style.cssText = `
        width:100%;
        padding:16px;
        margin-top:12px;
        font-size:18px;
        font-weight:bold;
        border:none;
        border-radius:12px;
        cursor:pointer;
        background:#ffb800;
        color:#222;
        box-shadow:0 3px 8px rgba(0,0,0,0.15);
    `;


    finalizar.onclick = function() {

        salvarCarrinho();

        window.location.href = "pedido.html";
    };


    caixa.appendChild(finalizar);


    // FECHAR
    let fechar = document.createElement("button");

    fechar.innerHTML = "Fechar";

    fechar.style.cssText = `
        width:100%;
        padding:15px;
        margin-top:10px;
        font-size:16px;
        border:2px solid #d62828;
        border-radius:12px;
        cursor:pointer;
        background:#fff;
        color:#c62828;
        font-weight:bold;
    `;


    fechar.onclick = function() {
        fundo.remove();
    };


    caixa.appendChild(fechar);

    fundo.appendChild(caixa);

    document.body.appendChild(fundo);
}


// ==========================================
// AUMENTAR QUANTIDADE
// ==========================================

function aumentarProduto(nome, preco) {

    carrinho.push({
        nome: nome,
        preco: Number(preco)
    });

    salvarCarrinho();

    let fundo = document.getElementById("fundoCarrinho");

    if (fundo) {
        fundo.remove();
    }

    verCarrinho();
}


// ==========================================
// DIMINUIR QUANTIDADE
// ==========================================

function diminuirProduto(nome, preco) {

    let indice = carrinho.findIndex(function(produto) {

        return (
            produto.nome === nome &&
            Number(produto.preco) === Number(preco)
        );
    });


    if (indice !== -1) {
        carrinho.splice(indice, 1);
    }


    salvarCarrinho();


    let fundo = document.getElementById("fundoCarrinho");

    if (fundo) {
        fundo.remove();
    }


    if (carrinho.length > 0) {
        verCarrinho();
    }
}


// ==========================================
// REMOVER PRODUTO
// ==========================================

function removerProduto(nome, preco) {

    carrinho = carrinho.filter(function(produto) {

        return !(
            produto.nome === nome &&
            Number(produto.preco) === Number(preco)
        );
    });


    salvarCarrinho();


    let fundo = document.getElementById("fundoCarrinho");

    if (fundo) {
        fundo.remove();
    }


    if (carrinho.length > 0) {
        verCarrinho();
    }
}


// ==========================================
// IR PARA PEDIDO
// ==========================================

function irParaPedido() {

    if (carrinho.length === 0) {
        alert("Adicione algum produto ao carrinho primeiro.");
        return;
    }

    salvarCarrinho();

    window.location.href = "pedido.html";
}


// ==========================================
// INICIAR CONTADOR
// ==========================================

document.addEventListener("DOMContentLoaded", function() {
    atualizarContador();
});
