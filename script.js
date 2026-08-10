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

    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );

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
        return;
    }


    let grupos = {};


    carrinho.forEach(function(produto) {

        let chave =
            produto.nome + "|" + produto.preco;


        if (!grupos[chave]) {

            grupos[chave] = {

                nome: produto.nome,

                preco: Number(produto.preco),

                quantidade: 0

            };

        }


        grupos[chave].quantidade++;

    });


    let fundo = document.createElement("div");

    fundo.id = "fundoCarrinho";


    fundo.style.cssText = `
        position:fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background:rgba(0,0,0,0.6);
        display:flex;
        justify-content:center;
        align-items:center;
        z-index:9999;
        padding:15px;
        box-sizing:border-box;
    `;


    let caixa = document.createElement("div");


    caixa.style.cssText = `
        background:white;
        width:100%;
        max-width:450px;
        max-height:85vh;
        overflow:auto;
        border-radius:15px;
        padding:20px;
        box-sizing:border-box;
    `;


    let titulo = document.createElement("h2");

    titulo.innerHTML = "Seu Carrinho";

    caixa.appendChild(titulo);


    let total = 0;


    Object.values(grupos).forEach(function(produto) {


        total +=
            produto.preco *
            produto.quantidade;


        let item = document.createElement("div");


        item.style.cssText = `
            border-bottom:1px solid #ddd;
            padding:15px 0;
        `;


        item.innerHTML = `

            <strong>${produto.nome}</strong><br>

            R$ ${produto.preco.toFixed(2)} cada

            <br><br>


            <button
                onclick="diminuirProduto('${produto.nome}', ${produto.preco})">

                −

            </button>


            <strong style="margin:0 15px;">

                ${produto.quantidade}

            </strong>


            <button
                onclick="aumentarProduto('${produto.nome}', ${produto.preco})">

                +

            </button>


            <button
                onclick="removerProduto('${produto.nome}', ${produto.preco})"
                style="margin-left:15px;">

                Remover

            </button>

        `;


        caixa.appendChild(item);

    });


    let totalTexto = document.createElement("h2");


    totalTexto.innerHTML =
        "Total: R$ " +
        total.toFixed(2);


    caixa.appendChild(totalTexto);


    // ==========================================
    // FAZER PEDIDO
    // ==========================================

    let finalizar = document.createElement("button");


    finalizar.innerHTML =
        "Fazer pedido";


    finalizar.style.cssText = `
        width:100%;
        padding:15px;
        margin-top:15px;
        font-size:18px;
        font-weight:bold;
        border-radius:8px;
        cursor:pointer;
    `;


    finalizar.onclick = function() {

        salvarCarrinho();

        window.location.href =
            "pedido.html";

    };


    caixa.appendChild(finalizar);


    // ==========================================
    // FECHAR
    // ==========================================

    let fechar = document.createElement("button");


    fechar.innerHTML =
        "Fechar";


    fechar.style.cssText = `
        width:100%;
        padding:15px;
        margin-top:10px;
        font-size:16px;
        border-radius:8px;
        cursor:pointer;
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


    let fundo =
        document.getElementById("fundoCarrinho");


    if (fundo) {

        fundo.remove();

    }


    verCarrinho();

}


// ==========================================
// DIMINUIR QUANTIDADE
// ==========================================

function diminuirProduto(nome, preco) {


    let indice =
        carrinho.findIndex(function(produto) {

            return (
                produto.nome === nome &&
                Number(produto.preco) === Number(preco)
            );

        });


    if (indice !== -1) {

        carrinho.splice(indice, 1);

    }


    salvarCarrinho();


    let fundo =
        document.getElementById("fundoCarrinho");


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


    carrinho =
        carrinho.filter(function(produto) {

            return !(
                produto.nome === nome &&
                Number(produto.preco) === Number(preco)
            );

        });


    salvarCarrinho();


    let fundo =
        document.getElementById("fundoCarrinho");


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

        return;

    }


    salvarCarrinho();


    window.location.href =
        "pedido.html";

}


// ==========================================
// INICIAR CONTADOR
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        atualizarContador();

    }
);
