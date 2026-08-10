// ==========================================
// CARRINHO - PASTELARIA EL SHADDAI
// ==========================================

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];


// ==========================================
// ATUALIZAR CONTADOR
// ==========================================

function atualizarContador() {

    const contador = document.getElementById("contador");

    if (contador) {
        contador.textContent = carrinho.length;
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

    // Não mostra alerta.
}


// ==========================================
// ABRIR CARRINHO
// ==========================================

function verCarrinho() {

    if (carrinho.length === 0) {

        abrirCarrinhoVazio();

        return;
    }


    // Agrupar produtos iguais

    let grupos = {};

    carrinho.forEach(function(produto) {

        let chave =
            produto.nome +
            "|" +
            Number(produto.preco);

        if (!grupos[chave]) {

            grupos[chave] = {

                nome: produto.nome,

                preco: Number(produto.preco),

                quantidade: 0

            };
        }

        grupos[chave].quantidade++;

    });


    // Fundo

    let fundo = document.createElement("div");

    fundo.id = "fundoCarrinho";

    fundo.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.55);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        padding: 15px;
        box-sizing: border-box;
    `;


    // Caixa

    let caixa = document.createElement("div");

    caixa.style.cssText = `
        background: white;
        width: 100%;
        max-width: 450px;
        max-height: 85vh;
        overflow-y: auto;
        border-radius: 16px;
        padding: 20px;
        box-sizing: border-box;
    `;


    // Título

    let titulo = document.createElement("h2");

    titulo.textContent = "Seu Carrinho";

    titulo.style.marginTop = "0";

    caixa.appendChild(titulo);


    // Produtos

    let total = 0;


    Object.values(grupos).forEach(function(produto) {

        total +=
            produto.preco *
            produto.quantidade;


        let item = document.createElement("div");

        item.style.cssText = `
            border-bottom: 1px solid #ddd;
            padding: 15px 0;
        `;


        let nome = document.createElement("strong");

        nome.textContent = produto.nome;

        nome.style.fontSize = "18px";


        let preco = document.createElement("div");

        preco.textContent =
            "R$ " +
            produto.preco.toFixed(2) +
            " cada";


        let controles = document.createElement("div");

        controles.style.cssText = `
            display: flex;
            align-items: center;
            gap: 10px;
            margin-top: 12px;
        `;


        // Botão diminuir

        let diminuir = document.createElement("button");

        diminuir.textContent = "−";

        diminuir.style.cssText = `
            padding: 8px 14px;
            font-size: 18px;
            cursor: pointer;
        `;

        diminuir.onclick = function() {

            diminuirProduto(
                produto.nome,
                produto.preco
            );

        };


        // Quantidade

        let quantidade = document.createElement("strong");

        quantidade.textContent =
            produto.quantidade;

        quantidade.style.fontSize = "18px";


        // Botão aumentar

        let aumentar = document.createElement("button");

        aumentar.textContent = "+";

        aumentar.style.cssText = `
            padding: 8px 14px;
            font-size: 18px;
            cursor: pointer;
        `;

        aumentar.onclick = function() {

            aumentarProduto(
                produto.nome,
                produto.preco
            );

        };


        // Botão remover

        let remover = document.createElement("button");

        remover.textContent = "Remover";

        remover.style.cssText = `
            padding: 8px 12px;
            margin-left: 10px;
            cursor: pointer;
        `;

        remover.onclick = function() {

            removerProduto(
                produto.nome,
                produto.preco
            );

        };


        controles.appendChild(diminuir);

        controles.appendChild(quantidade);

        controles.appendChild(aumentar);

        controles.appendChild(remover);


        item.appendChild(nome);

        item.appendChild(document.createElement("br"));

        item.appendChild(preco);

        item.appendChild(controles);

        caixa.appendChild(item);

    });


    // Total

    let totalTexto = document.createElement("h2");

    totalTexto.textContent =
        "Total: R$ " +
        total.toFixed(2);

    totalTexto.style.marginTop = "20px";

    caixa.appendChild(totalTexto);


    // ==========================================
    // BOTÃO FAZER PEDIDO
    // ==========================================

    let finalizar = document.createElement("button");

    finalizar.textContent = "Fazer pedido";

    finalizar.style.cssText = `
        width: 100%;
        padding: 15px;
        margin-top: 10px;
        font-size: 18px;
        font-weight: bold;
        border-radius: 8px;
        border: none;
        cursor: pointer;
    `;


    finalizar.onclick = function() {

        salvarCarrinho();

        window.location.href =
            "pedido.html";

    };


    caixa.appendChild(finalizar);


    // ==========================================
    // BOTÃO FECHAR
    // ==========================================

    let fechar = document.createElement("button");

    fechar.textContent = "Fechar";

    fechar.style.cssText = `
        width: 100%;
        padding: 14px;
        margin-top: 10px;
        font-size: 16px;
        border-radius: 8px;
        cursor: pointer;
    `;


    fechar.onclick = function() {

        fundo.remove();

    };


    caixa.appendChild(fechar);


    fundo.appendChild(caixa);

    document.body.appendChild(fundo);

}


// ==========================================
// CARRINHO VAZIO
// ==========================================

function abrirCarrinhoVazio() {

    let fundo = document.createElement("div");

    fundo.id = "fundoCarrinho";

    fundo.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.55);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    `;


    let caixa = document.createElement("div");

    caixa.style.cssText = `
        background: white;
        width: 90%;
        max-width: 400px;
        padding: 25px;
        border-radius: 16px;
        text-align: center;
        box-sizing: border-box;
    `;


    let titulo = document.createElement("h2");

    titulo.textContent =
        "Seu carrinho está vazio";

    caixa.appendChild(titulo);


    let fechar = document.createElement("button");

    fechar.textContent = "Fechar";

    fechar.style.cssText = `
        width: 100%;
        padding: 14px;
        margin-top: 15px;
        cursor: pointer;
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

    fecharCarrinho();

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

    fecharCarrinho();


    if (carrinho.length > 0) {

        verCarrinho();

    } else {

        atualizarContador();

    }

}


// ==========================================
// REMOVER PRODUTO COMPLETAMENTE
// ==========================================

function removerProduto(nome, preco) {

    carrinho = carrinho.filter(function(produto) {

        return !(
            produto.nome === nome &&
            Number(produto.preco) === Number(preco)
        );

    });


    salvarCarrinho();

    fecharCarrinho();


    if (carrinho.length > 0) {

        verCarrinho();

    } else {

        atualizarContador();

    }

}


// ==========================================
// FECHAR CARRINHO
// ==========================================

function fecharCarrinho() {

    let fundo =
        document.getElementById("fundoCarrinho");

    if (fundo) {

        fundo.remove();

    }

}


// ==========================================
// IR PARA PEDIDO
// ==========================================

function irParaPedido() {

    if (carrinho.length === 0) {

        abrirCarrinhoVazio();

        return;

    }


    salvarCarrinho();

    window.location.href =
        "pedido.html";

}


// ==========================================
// ENVIAR PEDIDO DIRETO PELO WHATSAPP
// ==========================================

function enviarwhatsApp() {

    if (carrinho.length === 0) {

        return;

    }


    let nome =
        prompt("Qual é o seu nome?");


    let tipoPedido =
        prompt(
            "Digite:\n1 - Entrega\n2 - Retirada"
        );


    let endereco = "";


    if (tipoPedido === "1") {

        endereco =
            prompt("Digite seu endereço:");

    }


    let mensagem =
        "Olá! Meu nome é " +
        nome +
        ".\n";


    if (tipoPedido === "1") {

        mensagem +=
            "Pedido para ENTREGA\n";

        mensagem +=
            "Endereço: " +
            endereco +
            "\n";

    } else {

        mensagem +=
            "Pedido para RETIRADA\n";

    }


    mensagem +=
        "\nGostaria de fazer este pedido:\n\n";


    let total = 0;


    carrinho.forEach(function(produto) {

        mensagem +=
            "• " +
            produto.nome +
            " - R$ " +
            Number(produto.preco).toFixed(2) +
            "\n";


        total +=
            Number(produto.preco);

    });


    mensagem +=
        "\nTotal: R$ " +
        total.toFixed(2);


    window.location.href =
        "https://wa.me/5585988944421?text=" +
        encodeURIComponent(mensagem);

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
