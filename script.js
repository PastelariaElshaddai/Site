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
// ADICIONAR PRODUTO SIMPLES
// ==========================================

function adicionarProduto(nome, preco) {

    carrinho.push({
        nome: nome,
        preco: Number(preco)
    });

    salvarCarrinho();
}


// ==========================================
// ADICIONAR PRODUTO COM OPÇÕES
// ==========================================

function personalizarProduto(
    nome,
    preco,
    retirar = [],
    adicionais = [],
    escolhas = []
) {

    let fundo = document.createElement("div");

    fundo.id = "fundoPersonalizacao";

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
        z-index:10000;
        padding:15px;
        box-sizing:border-box;
    `;


    let caixa = document.createElement("div");

    caixa.style.cssText = `
        background:white;
        width:100%;
        max-width:450px;
        max-height:90vh;
        overflow:auto;
        border-radius:15px;
        padding:20px;
        box-sizing:border-box;
    `;


    let titulo = document.createElement("h2");

    titulo.innerText = nome;

    caixa.appendChild(titulo);


    let precoBase = Number(preco);


    // ==========================================
    // RETIRAR INGREDIENTES
    // ==========================================

    if (retirar.length > 0) {

        let tituloRetirar =
            document.createElement("h3");

        tituloRetirar.innerText =
            "Retirar ingredientes";

        caixa.appendChild(tituloRetirar);


        retirar.forEach(function(ingrediente, indice) {

            let label =
                document.createElement("label");

            label.style.cssText = `
                display:block;
                margin:10px 0;
                font-weight:normal;
            `;


            label.innerHTML = `
                <input
                    type="checkbox"
                    id="retirar_${indice}"
                    value="${ingrediente}"
                >
                Sem ${ingrediente}
            `;


            caixa.appendChild(label);

        });

    }


    // ==========================================
    // ADICIONAIS
    // ==========================================

    if (adicionais.length > 0) {

        let tituloAdicionais =
            document.createElement("h3");

        tituloAdicionais.innerText =
            "Adicionar";

        caixa.appendChild(tituloAdicionais);


        adicionais.forEach(function(adicional, indice) {

            let label =
                document.createElement("label");

            label.style.cssText = `
                display:block;
                margin:10px 0;
                font-weight:normal;
            `;


            label.innerHTML = `
                <input
                    type="checkbox"
                    id="adicional_${indice}"
                    value="${indice}"
                >
                ${adicional.nome} +
                R$ ${Number(adicional.preco)
                    .toFixed(2)
                    .replace(".", ",")}
            `;


            caixa.appendChild(label);

        });

    }


    // ==========================================
    // ESCOLHAS
    // ==========================================

    if (escolhas.length > 0) {

        escolhas.forEach(function(escolha, grupo) {

            let tituloEscolha =
                document.createElement("h3");

            tituloEscolha.innerText =
                escolha.titulo;

            caixa.appendChild(tituloEscolha);


            escolha.opcoes.forEach(function(opcao, indice) {

                let label =
                    document.createElement("label");

                label.style.cssText = `
                    display:block;
                    margin:10px 0;
                    font-weight:normal;
                `;


                label.innerHTML = `
                    <input
                        type="radio"
                        name="escolha_${grupo}"
                        value="${opcao}"
                        ${indice === 0 ? "checked" : ""}
                    >
                    ${opcao}
                `;


                caixa.appendChild(label);

            });

        });

    }


    // ==========================================
    // QUANTIDADE
    // ==========================================

    let tituloQuantidade =
        document.createElement("h3");

    tituloQuantidade.innerText =
        "Quantidade";

    caixa.appendChild(tituloQuantidade);


    let quantidade = 1;


    let quantidadeArea =
        document.createElement("div");

    quantidadeArea.style.cssText = `
        display:flex;
        align-items:center;
        gap:20px;
        margin-bottom:20px;
    `;


    let menos =
        document.createElement("button");

    menos.innerText = "−";


    let numero =
        document.createElement("strong");

    numero.innerText = quantidade;


    let mais =
        document.createElement("button");

    mais.innerText = "+";


    menos.onclick = function() {

        if (quantidade > 1) {

            quantidade--;

            numero.innerText =
                quantidade;

        }

    };


    mais.onclick = function() {

        quantidade++;

        numero.innerText =
            quantidade;

    };


    quantidadeArea.appendChild(menos);

    quantidadeArea.appendChild(numero);

    quantidadeArea.appendChild(mais);

    caixa.appendChild(quantidadeArea);


    // ==========================================
    // TOTAL
    // ==========================================

    let totalTexto =
        document.createElement("h3");

    totalTexto.innerText =
        "Total: R$ " +
        precoBase.toFixed(2).replace(".", ",");

    caixa.appendChild(totalTexto);


    // ==========================================
    // ATUALIZAR TOTAL
    // ==========================================

    function atualizarTotalPersonalizacao() {

        let total = precoBase;


        adicionais.forEach(function(adicional, indice) {

            let checkbox =
                document.getElementById(
                    "adicional_" + indice
                );


            if (
                checkbox &&
                checkbox.checked
            ) {

                total +=
                    Number(adicional.preco);

            }

        });


        total *= quantidade;


        totalTexto.innerText =
            "Total: R$ " +
            total.toFixed(2).replace(".", ",");

    }


    adicionais.forEach(function(adicional, indice) {

        let checkbox =
            document.getElementById(
                "adicional_" + indice
            );


        if (checkbox) {

            checkbox.addEventListener(
                "change",
                atualizarTotalPersonalizacao
            );

        }

    });


    mais.addEventListener(
        "click",
        atualizarTotalPersonalizacao
    );


    menos.addEventListener(
        "click",
        atualizarTotalPersonalizacao
    );


    // ==========================================
    // BOTÃO ADICIONAR
    // ==========================================

    let adicionar =
        document.createElement("button");


    adicionar.innerText =
        "Adicionar ao carrinho";


    adicionar.style.cssText = `
        width:100%;
        padding:15px;
        margin-top:10px;
        background:#ffb300;
        border:none;
        border-radius:8px;
        font-size:17px;
        font-weight:bold;
        cursor:pointer;
    `;


    adicionar.onclick = function() {

        let precoFinal = precoBase;


        let detalhes = [];


        // RETIRAR

        retirar.forEach(function(ingrediente, indice) {

            let checkbox =
                document.getElementById(
                    "retirar_" + indice
                );


            if (
                checkbox &&
                checkbox.checked
            ) {

                detalhes.push(
                    "Sem " + ingrediente
                );

            }

        });


        // ADICIONAIS

        adicionais.forEach(function(adicional, indice) {

            let checkbox =
                document.getElementById(
                    "adicional_" + indice
                );


            if (
                checkbox &&
                checkbox.checked
            ) {

                precoFinal +=
                    Number(adicional.preco);


                detalhes.push(
                    adicional.nome +
                    " + R$ " +
                    Number(adicional.preco)
                        .toFixed(2)
                );

            }

        });


        // ESCOLHAS

        escolhas.forEach(function(escolha, grupo) {

            let selecionado =
                document.querySelector(
                    'input[name="escolha_' +
                    grupo +
                    '"]:checked'
                );


            if (selecionado) {

                detalhes.push(
                    selecionado.value
                );

            }

        });


        for (
            let i = 0;
            i < quantidade;
            i++
        ) {

            carrinho.push({

                nome: nome,

                preco: precoFinal,

                detalhes: detalhes

            });

        }


        salvarCarrinho();


        fundo.remove();

    };


    caixa.appendChild(adicionar);


    // ==========================================
    // CANCELAR
    // ==========================================

    let cancelar =
        document.createElement("button");


    cancelar.innerText =
        "Cancelar";


    cancelar.style.cssText = `
        width:100%;
        padding:13px;
        margin-top:10px;
        border:1px solid #ccc;
        border-radius:8px;
        background:white;
        cursor:pointer;
    `;


    cancelar.onclick = function() {

        fundo.remove();

    };


    caixa.appendChild(cancelar);


    fundo.appendChild(caixa);

    document.body.appendChild(fundo);

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

        let detalhesTexto =
            produto.detalhes
            ? produto.detalhes.join(", ")
            : "";


        let chave =
            produto.nome +
            "|" +
            produto.preco +
            "|" +
            detalhesTexto;


        if (!grupos[chave]) {

            grupos[chave] = {

                nome: produto.nome,

                preco: Number(produto.preco),

                detalhes:
                    produto.detalhes || [],

                quantidade: 0

            };

        }


        grupos[chave].quantidade++;

    });


    let fundo =
        document.createElement("div");

    fundo.id =
        "fundoCarrinho";


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


    let caixa =
        document.createElement("div");


    caixa.style.cssText = `
    background:linear-gradient(135deg, #fff8e1, #ffffff);
    width:100%;
    max-width:450px;
    max-height:85vh;
    overflow:auto;
    border-radius:18px;
    padding:20px;
    box-sizing:border-box;
    box-shadow:0 10px 35px rgba(0,0,0,0.25);
    border:2px solid #ffb300;
`;


    let titulo =
        document.createElement("h2");


    titulo.innerHTML =
        "Seu Carrinho";
titulo.style.cssText = `
    color:#d84315;
    margin-top:0;
    font-size:28px;
`;

    caixa.appendChild(titulo);


    let total = 0;


    Object.values(grupos).forEach(function(produto) {

        total +=
            produto.preco *
            produto.quantidade;


        let item =
            document.createElement("div");


        item.style.cssText = `
            border-bottom:1px solid #ddd;
            padding:15px 0;
        `;


        let detalhesHTML = "";


        if (
            produto.detalhes &&
            produto.detalhes.length > 0
        ) {

            detalhesHTML =
                "<br><small>" +
                produto.detalhes.join("<br>") +
                "</small>";

        }


        item.innerHTML = `

            <strong>
                ${produto.nome}
            </strong>

            ${detalhesHTML}

            <br>

            R$ ${produto.preco.toFixed(2)}
            cada

            <br><br>

            <button
                onclick="diminuirProduto(
                    '${produto.nome}',
                    ${produto.preco}
                )">

                −

            </button>

            <strong style="margin:0 15px;">

                ${produto.quantidade}

            </strong>

            <button
                onclick="aumentarProduto(
                    '${produto.nome}',
                    ${produto.preco}
                )">

                +

            </button>

            <button
                onclick="removerProduto(
                    '${produto.nome}',
                    ${produto.preco}
                )"
                style="margin-left:15px;">

                Remover

            </button>

        `;


        caixa.appendChild(item);

    });


    let totalTexto =
        document.createElement("h2");


    totalTexto.innerHTML =
        "Total: R$ " +
        total.toFixed(2);


    caixa.appendChild(totalTexto);


    // FAZER PEDIDO

    let finalizar =
        document.createElement("button");


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


    // FECHAR

    let fechar =
        document.createElement("button");


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
// AUMENTAR
// ==========================================

function aumentarProduto(nome, preco) {

    carrinho.push({

        nome: nome,

        preco: Number(preco)

    });


    salvarCarrinho();


    let fundo =
        document.getElementById(
            "fundoCarrinho"
        );


    if (fundo) {

        fundo.remove();

    }


    verCarrinho();

}


// ==========================================
// DIMINUIR
// ==========================================

function diminuirProduto(nome, preco) {

    let indice =
        carrinho.findIndex(function(produto) {

            return (
                produto.nome === nome &&
                Number(produto.preco) ===
                Number(preco)
            );

        });


    if (indice !== -1) {

        carrinho.splice(
            indice,
            1
        );

    }


    salvarCarrinho();


    let fundo =
        document.getElementById(
            "fundoCarrinho"
        );


    if (fundo) {

        fundo.remove();

    }


    if (carrinho.length > 0) {

        verCarrinho();

    }

}


// ==========================================
// REMOVER
// ==========================================

function removerProduto(nome, preco) {

    carrinho =
        carrinho.filter(function(produto) {

            return !(
                produto.nome === nome &&
                Number(produto.preco) ===
                Number(preco)
            );

        });


    salvarCarrinho();


    let fundo =
        document.getElementById(
            "fundoCarrinho"
        );


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
// CONTADOR
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        atualizarContador();

    }
);
