let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    atualizarContador();
}

function atualizarContador() {
    const contador = document.getElementById("contador");
    if (!contador) return;

    let quantidade = 0;

    carrinho.forEach(item => {
        quantidade += Number(item.quantidade || 1);
    });

    contador.textContent = quantidade;
}


// ==================================================
// ADICIONAR PRODUTO NORMAL
// ==================================================

function adicionarProduto(nome, preco) {

    const existente = carrinho.find(item =>
        item.nome === nome &&
        Number(item.preco) === Number(preco)
    );

    if (existente) {
        existente.quantidade =
            Number(existente.quantidade || 1) + 1;
    } else {
        carrinho.push({
            nome: nome,
            preco: Number(preco),
            quantidade: 1
        });
    }

    salvarCarrinho();

    alert("Produto adicionado ao carrinho!");
}


// ==================================================
// PERSONALIZAR PRODUTO
// ==================================================

function personalizarProduto(nome, preco, ingredientes, adicionais) {

    const antigo = document.getElementById("personalizarModal");

    if (antigo) antigo.remove();


    const fundo = document.createElement("div");

    fundo.id = "personalizarModal";

    fundo.style.cssText = `
        position:fixed;
        inset:0;
        background:rgba(0,0,0,.65);
        z-index:9999;
        display:flex;
        align-items:center;
        justify-content:center;
        padding:15px;
    `;


    const caixa = document.createElement("div");

    caixa.style.cssText = `
        width:100%;
        max-width:500px;
        max-height:90vh;
        overflow:auto;
        background:#fff8e7;
        border:4px solid #ffb300;
        border-radius:22px;
        padding:20px;
        box-sizing:border-box;
    `;


    caixa.innerHTML = `
        <h2 style="
            color:#c62828;
            text-align:center;
            margin-top:0;
        ">
            Personalizar pedido
        </h2>

        <div style="
            background:white;
            border:2px solid #ffd166;
            border-radius:15px;
            padding:15px;
            margin-bottom:20px;
        ">

            <strong style="font-size:22px;">
                ${nome}
            </strong>

            <div id="totalPersonalizado"
                 style="
                    color:#c62828;
                    font-size:22px;
                    font-weight:bold;
                    margin-top:8px;
                 ">
                Total: R$ ${Number(preco).toFixed(2)}
            </div>

        </div>

        <h3 style="color:#c62828;">
            Ingredientes
        </h3>

        <div id="listaIngredientes"></div>

        <h3 style="
            color:#c62828;
            margin-top:20px;
        ">
            Adicionais
        </h3>

        <div id="listaAdicionais"></div>

        <button id="btnAdicionarPersonalizado"
            style="
                width:100%;
                padding:16px;
                margin-top:20px;
                border:0;
                border-radius:12px;
                background:#ffb300;
                font-size:19px;
                font-weight:bold;
            ">
            Adicionar ao carrinho
        </button>

        <button id="btnFecharPersonalizar"
            style="
                width:100%;
                padding:14px;
                margin-top:10px;
                border:2px solid #c62828;
                border-radius:12px;
                background:white;
                color:#c62828;
                font-size:18px;
                font-weight:bold;
            ">
            Fechar
        </button>
    `;


    fundo.appendChild(caixa);
    document.body.appendChild(fundo);


    // ==================================================
    // INGREDIENTES
    // ==================================================

    const listaIngredientes =
        document.getElementById("listaIngredientes");

    ingredientes.forEach((ingrediente, index) => {

        listaIngredientes.innerHTML += `
            <label style="
                display:flex;
                justify-content:space-between;
                align-items:center;
                background:white;
                border:1px solid #ddd;
                border-radius:12px;
                padding:13px;
                margin-bottom:8px;
                font-size:17px;
            ">

                <span>${ingrediente}</span>

                <input
                    type="checkbox"
                    class="ingrediente"
                    data-nome="${ingrediente}"
                    checked
                    style="
                        width:24px;
                        height:24px;
                    "
                >

            </label>
        `;
    });


    // ==================================================
    // ADICIONAIS
    // ==================================================

    const listaAdicionais =
        document.getElementById("listaAdicionais");

    adicionais.forEach((adicional, index) => {

        listaAdicionais.innerHTML += `
            <label style="
                display:flex;
                justify-content:space-between;
                align-items:center;
                background:white;
                border:1px solid #ddd;
                border-radius:12px;
                padding:13px;
                margin-bottom:8px;
                font-size:17px;
            ">

                <span>
                    ${adicional.nome}

                    <strong style="color:#c62828;">
                        + R$ ${Number(adicional.preco).toFixed(2)}
                    </strong>
                </span>

                <input
                    type="checkbox"
                    class="adicional"
                    data-index="${index}"
                    style="
                        width:24px;
                        height:24px;
                    "
                >

            </label>
        `;
    });


    // ==================================================
    // ATUALIZAR TOTAL
    // ==================================================

    function atualizarTotal() {

        let total = Number(preco);

        document
            .querySelectorAll(
                "#personalizarModal .adicional"
            )
            .forEach(check => {

                if (check.checked) {

                    const index =
                        Number(check.dataset.index);

                    total +=
                        Number(adicionais[index].preco);
                }
            });


        document.getElementById(
            "totalPersonalizado"
        ).textContent =
            "Total: R$ " + total.toFixed(2);

    }


    document
        .querySelectorAll(
            "#personalizarModal .adicional"
        )
        .forEach(check => {

            check.addEventListener(
                "change",
                atualizarTotal
            );

        });


    // ==================================================
    // ADICIONAR AO CARRINHO
    // ==================================================

    document.getElementById(
    "btnAdicionarPersonalizado"
).onclick = function() {

    let total = Number(preco);

    let adicionaisEscolhidos = [];

    let ingredientesRetirados = [];


    // ==============================================
    // VERIFICAR INGREDIENTES RETIRADOS
    // ==============================================

    document
        .querySelectorAll(
            "#personalizarModal .ingrediente"
        )
        .forEach(function(check) {

            if (!check.checked) {

                ingredientesRetirados.push(
                    check.dataset.nome
                );

            }

        });


    // ==============================================
    // VERIFICAR ADICIONAIS
    // ==============================================

    document
        .querySelectorAll(
            "#personalizarModal .adicional"
        )
        .forEach(function(check) {

            if (check.checked) {

                const index =
                    Number(check.dataset.index);

                const adicional =
                    adicionais[index];

                total +=
                    Number(adicional.preco);

                adicionaisEscolhidos.push(
                    adicional.nome
                );

            }

        });


    // ==============================================
    // NOME DO PRODUTO
    // ==============================================

    let nomeFinal = nome;


    // ==============================================
    // DETALHES DO PEDIDO
    // ==============================================

    let detalhes = [];


    if (ingredientesRetirados.length > 0) {

        detalhes.push(
            "Sem: " +
            ingredientesRetirados.join(", ")
        );

    }


    if (adicionaisEscolhidos.length > 0) {

        detalhes.push(
            "Adicional: " +
            adicionaisEscolhidos.join(", ")
        );

    }


    // ==============================================
    // SALVAR NO CARRINHO
    // ==============================================

    carrinho.push({

        nome: nomeFinal,

        preco: total,

        quantidade: 1,

        detalhes: detalhes

    });


    salvarCarrinho();


    fundo.remove();


    verCarrinho();

};

    document.getElementById(
        "btnFecharPersonalizar"
    ).onclick = function() {

        fundo.remove();

    };

}


// ==================================================
// CARRINHO
// ==================================================

function verCarrinho() {

    const antigo =
        document.getElementById("carrinhoModal");

    if (antigo) antigo.remove();


    const fundo = document.createElement("div");

    fundo.id = "carrinhoModal";

    fundo.style.cssText = `
        position:fixed;
        inset:0;
        background:rgba(0,0,0,.65);
        z-index:9998;
        display:flex;
        align-items:center;
        justify-content:center;
        padding:15px;
    `;


    const caixa = document.createElement("div");

    caixa.style.cssText = `
        width:100%;
        max-width:500px;
        max-height:90vh;
        overflow:auto;
        background:#fff8e7;
        border:4px solid #ffb300;
        border-radius:22px;
        padding:20px;
        box-sizing:border-box;
    `;


    caixa.innerHTML = `
        <h2 style="
            text-align:center;
            color:#c62828;
            margin-top:0;
        ">
            Seu Carrinho
        </h2>
    `;


    let total = 0;


    if (carrinho.length === 0) {

        caixa.innerHTML += `
            <p style="
                text-align:center;
                font-size:18px;
            ">
                Seu carrinho está vazio.
            </p>
        `;

    } else {

        carrinho.forEach((produto, index) => {

            const quantidade =
                Number(produto.quantidade || 1);

            total +=
                Number(produto.preco) * quantidade;


            caixa.innerHTML += `
                <div style="
                    background:white;
                    border:2px solid #ffd166;
                    border-radius:14px;
                    padding:15px;
                    margin-bottom:10px;
                ">

                    <strong style="
                        font-size:18px;
                    ">
                        ${produto.nome}
                    </strong>

                    <p>
                        R$ ${Number(produto.preco).toFixed(2)}
                        cada
                    </p>

                    <button
                        onclick="diminuirProduto(${index})"
                        style="
                            padding:10px 15px;
                            font-size:18px;
                        "
                    >
                        −
                    </button>

                    <strong style="
                        margin:0 15px;
                    ">
                        ${quantidade}
                    </strong>

                    <button
                        onclick="aumentarProduto(${index})"
                        style="
                            padding:10px 15px;
                            font-size:18px;
                        "
                    >
                        +
                    </button>

                    <button
                        onclick="removerProduto(${index})"
                        style="
                            margin-left:10px;
                            padding:10px;
                            background:#c62828;
                            color:white;
                            border:0;
                            border-radius:8px;
                        "
                    >
                        Remover
                    </button>

                </div>
            `;
        });


        caixa.innerHTML += `
            <h2 style="
                text-align:center;
                color:#c62828;
            ">
                Total: R$ ${total.toFixed(2)}
            </h2>

            <button
                onclick="irParaPedido()"
                style="
                    width:100%;
                    padding:16px;
                    background:#ffb300;
                    border:0;
                    border-radius:12px;
                    font-size:19px;
                    font-weight:bold;
                "
            >
                Fazer pedido
            </button>
        `;
    }


    caixa.innerHTML += `
        <button
            id="fecharCarrinho"
            style="
                width:100%;
                padding:14px;
                margin-top:10px;
                background:white;
                border:2px solid #c62828;
                border-radius:12px;
                color:#c62828;
                font-size:18px;
                font-weight:bold;
            "
        >
            Fechar
        </button>
    `;


    fundo.appendChild(caixa);
    document.body.appendChild(fundo);


    document.getElementById(
        "fecharCarrinho"
    ).onclick = function() {

        fundo.remove();

    };

}


// ==================================================
// + QUANTIDADE
// ==================================================

function aumentarProduto(index) {

    if (!carrinho[index]) return;

    carrinho[index].quantidade =
        Number(carrinho[index].quantidade || 1) + 1;

    salvarCarrinho();

    verCarrinho();
}


// ==================================================
// - QUANTIDADE
// ==================================================

function diminuirProduto(index) {

    if (!carrinho[index]) return;

    carrinho[index].quantidade =
        Number(carrinho[index].quantidade || 1) - 1;


    if (carrinho[index].quantidade <= 0) {

        carrinho.splice(index, 1);

    }


    salvarCarrinho();

    verCarrinho();
}


// ==================================================
// REMOVER
// ==================================================

function removerProduto(index) {

    carrinho.splice(index, 1);

    salvarCarrinho();

    verCarrinho();
}


// ==================================================
// FAZER PEDIDO
// ==================================================

function irParaPedido() {

    if (carrinho.length === 0) {

        alert("Seu carrinho está vazio.");

        return;
    }

    salvarCarrinho();

    window.location.href =
        "pedido.html";
}


// ==================================================
// INICIAR
// ==================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        atualizarContador();

    }
);
