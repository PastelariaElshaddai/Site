let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
let quantidade = carrinho.length;


// ===============================
// ADICIONAR PRODUTO
// ===============================

function adicionarProduto(nome, preco) {

    carrinho.push({
        nome: nome,
        preco: preco
    });

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    quantidade = carrinho.length;

    let contador = document.getElementById("contador");

    if (contador) {
        contador.innerHTML = quantidade;
    }

    alert(nome + " foi adicionado ao carrinho!");
}


// ===============================
// ABRIR CARRINHO
// ===============================

function verCarrinho() {

    if (carrinho.length === 0) {

        alert("🛒 Seu carrinho está vazio!");

        return;
    }


    let grupos = {};


    carrinho.forEach(produto => {

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


    // FUNDO

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
    `;


    // CAIXA

    let caixa = document.createElement("div");


    caixa.style.cssText = `
        background:white;
        width:90%;
        max-width:450px;
        max-height:80%;
        overflow:auto;
        border-radius:15px;
        padding:20px;
        box-sizing:border-box;
    `;


    // TÍTULO

    let titulo = document.createElement("h2");

    titulo.innerHTML = "🛒 Seu Carrinho";

    caixa.appendChild(titulo);


    let total = 0;


    // PRODUTOS

    Object.values(grupos).forEach(produto => {


        total += produto.preco * produto.quantidade;


        let item = document.createElement("div");


        item.style.cssText = `
            border-bottom:1px solid #ddd;
            padding:12px 0;
        `;


        item.innerHTML = `

            <strong>${produto.nome}</strong><br>

            R$ ${produto.preco.toFixed(2)} cada

            <br><br>


            <button onclick="diminuirProduto('${produto.nome}', ${produto.preco})">

                ➖

            </button>


            <strong style="margin:0 15px;">

                ${produto.quantidade}

            </strong>


            <button onclick="aumentarProduto('${produto.nome}', ${produto.preco})">

                ➕

            </button>


            <button
                onclick="removerProduto('${produto.nome}', ${produto.preco})"
                style="margin-left:15px;">

                🗑️

            </button>

        `;


        caixa.appendChild(item);

    });


    // TOTAL

    let totalTexto = document.createElement("h2");


    totalTexto.innerHTML =
        "💰 Total: R$ " +
        total.toFixed(2);


    caixa.appendChild(totalTexto);


    // ===============================
    // BOTÃO FAZER PEDIDO
    // ===============================

    let finalizar = document.createElement("button");


    finalizar.innerHTML = "📦 Fazer Pedido";


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

        localStorage.setItem(
            "carrinho",
            JSON.stringify(carrinho)
        );


        window.location.href = "pedido.html";

    };


    caixa.appendChild(finalizar);


    // ===============================
    // BOTÃO FECHAR
    // ===============================

    let fechar = document.createElement("button");


    fechar.innerHTML = "❌ Fechar";


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


// ===============================
// AUMENTAR QUANTIDADE
// ===============================

function aumentarProduto(nome, preco) {

    carrinho.push({

        nome: nome,

        preco: preco

    });


    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );


    quantidade = carrinho.length;


    let contador = document.getElementById("contador");

    if (contador) {

        contador.innerHTML = quantidade;

    }


    let fundo = document.getElementById("fundoCarrinho");

    if (fundo) {

        fundo.remove();

    }


    verCarrinho();

}


// ===============================
// DIMINUIR QUANTIDADE
// ===============================

function diminuirProduto(nome, preco) {


    let indice = carrinho.findIndex(

        produto =>

            produto.nome === nome &&

            Number(produto.preco) === Number(preco)

    );


    if (indice !== -1) {

        carrinho.splice(indice, 1);

    }


    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );


    quantidade = carrinho.length;


    let contador = document.getElementById("contador");

    if (contador) {

        contador.innerHTML = quantidade;

    }


    let fundo = document.getElementById("fundoCarrinho");

    if (fundo) {

        fundo.remove();

    }


    if (carrinho.length > 0) {

        verCarrinho();

    } else {

        alert("🛒 Seu carrinho está vazio!");

    }

}


// ===============================
// REMOVER PRODUTO
// ===============================

function removerProduto(nome, preco) {


    carrinho = carrinho.filter(

        produto =>

            !(

                produto.nome === nome &&

                Number(produto.preco) === Number(preco)

            )

    );


    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );


    quantidade = carrinho.length;


    let contador = document.getElementById("contador");

    if (contador) {

        contador.innerHTML = quantidade;

    }


    let fundo = document.getElementById("fundoCarrinho");

    if (fundo) {

        fundo.remove();

    }


    if (carrinho.length > 0) {

        verCarrinho();

    } else {

        alert("🛒 Seu carrinho está vazio!");

    }

}


// ===============================
// ENVIAR PEDIDO PELO WHATSAPP
// ===============================

function enviarwhatsApp() {


    if (carrinho.length === 0) {

        alert("Seu carrinho está vazio!");

        return;

    }


    let nome = prompt("Qual é o seu nome?");


    let tipoPedido = prompt(
        "Digite:\n1 - Entrega\n2 - Retirada"
    );


    let endereco = "";


    if (tipoPedido === "1") {

        endereco = prompt("Digite seu endereço:");

    }


    let mensagem =
        "Olá! Meu nome é " +
        nome +
        ".\n";


    if (tipoPedido === "1") {

        mensagem +=
            "🚚 Pedido para ENTREGA\n";

        mensagem +=
            "📍 Endereço: " +
            endereco +
            "\n";

    } else {

        mensagem +=
            "🛍️ Pedido para RETIRADA\n";

    }


    mensagem +=
        "\nGostaria de fazer este pedido:\n\n";


    let total = 0;


    carrinho.forEach(produto => {

        mensagem +=
            "• " +
            produto.nome +
            " - R$ " +
            Number(produto.preco).toFixed(2) +
            "\n";


        total += Number(produto.preco);

    });


    mensagem +=
        "\n💰 Total: R$ " +
        total.toFixed(2);


    location.href =
        "https://wa.me/5585988944421?text=" +
        encodeURIComponent(mensagem);

}


// ===============================
// IR PARA FINALIZAÇÃO
// ===============================

function irParaPedido() {


    if (carrinho.length === 0) {

        alert("🛒 Seu carrinho está vazio!");

        return;

    }


    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );


    window.location.href = "pedido.html";

}
