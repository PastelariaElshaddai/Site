// ======================================================
// PASTELARIA EL SHADDAI - SCRIPT COMPLETO
// ======================================================


// ======================================================
// CARRINHO
// ======================================================

let carrinho =
    JSON.parse(localStorage.getItem("carrinho")) || [];


// ======================================================
// SALVAR CARRINHO
// ======================================================

function salvarCarrinho() {

    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );

    atualizarContador();
}


// ======================================================
// CONTADOR
// ======================================================

function atualizarContador() {

    const contador =
        document.getElementById("contador");

    if (!contador) return;

    let quantidade = 0;

    carrinho.forEach(function(item) {

        quantidade +=
            Number(item.quantidade || 1);

    });

    contador.textContent = quantidade;
}


// ======================================================
// ADICIONAR PRODUTO NORMAL
// ======================================================

function adicionarProduto(nome, preco) {

    const existente =
        carrinho.find(function(item) {

            return (
                item.nome === nome &&
                Number(item.preco) === Number(preco) &&
                (!item.detalhes ||
                item.detalhes.length === 0)
            );

        });


    if (existente) {

        existente.quantidade =
            Number(existente.quantidade || 1) + 1;

    } else {

        carrinho.push({

            nome: nome,

            preco: Number(preco),

            quantidade: 1,

            detalhes: []

        });

    }


    salvarCarrinho();

    alert("Produto adicionado ao carrinho!");

}


// ======================================================
// PERSONALIZAR PASTEL
// ======================================================

function personalizarProduto(
    nome,
    preco,
    ingredientes,
    adicionais
) {

    abrirPersonalizacao({

        tipo: "pastel",

        nome: nome,

        preco: Number(preco),

        ingredientes: ingredientes || [],

        adicionais: adicionais || []

    });

}


// ======================================================
// PERSONALIZAR PIZZA
// ======================================================

function personalizarPizza(
    nome,
    preco,
    ingredientes
) {

    abrirPersonalizacao({

        tipo: "pizza",

        nome: nome,

        preco: Number(preco),

        ingredientes: ingredientes || [],

        adicionais: [

            {
                nome: "Borda de Catupiry",
                preco: 5
            },

            {
                nome: "Borda de Cheddar",
                preco: 5
            },

            {
                nome: "Queijo extra",
                preco: 4
            },

            {
                nome: "Bacon",
                preco: 5
            },

            {
                nome: "Calabresa extra",
                preco: 5
            },

            {
                nome: "Catupiry extra",
                preco: 4
            }

        ]

    });

}


// ======================================================
// PERSONALIZAR BATATA
// ======================================================

function personalizarBatata(
    nome,
    preco
) {

    abrirPersonalizacao({

        tipo: "batata",

        nome: nome,

        preco: Number(preco),

        ingredientes: [],

        adicionais: [

            {
                nome: "Queijo",
                preco: 3
            },

            {
                nome: "Cheddar",
                preco: 3
            },

            {
                nome: "Catupiry",
                preco: 4
            },

            {
                nome: "Bacon",
                preco: 5
            },

            {
                nome: "Calabresa",
                preco: 5
            },

            {
                nome: "Frango",
                preco: 5
            },

            {
                nome: "Molho especial",
                preco: 2
            }

        ]

    });

}


// ======================================================
// PERSONALIZAR BEBIDA
// ======================================================

function personalizarBebida(
    nome,
    preco1L,
    preco2L
) {

    const fundo =
        document.createElement("div");

    fundo.className =
        "modal-personalizar";

    const caixa =
        document.createElement("div");

    caixa.className =
        "caixa-personalizar";

    caixa.innerHTML = `

        <h2>
            Escolha o tamanho
        </h2>

        <div style="
            background:white;
            border:2px solid #ffd166;
            border-radius:15px;
            padding:15px;
            margin-bottom:18px;
        ">

            <strong style="
                font-size:22px;
            ">
                ${nome}
            </strong>

        </div>

        <label class="opcao-personalizar">

            <span>
                1 Litro
                <strong class="preco-adicional">
                    R$ ${Number(preco1L)
                    .toFixed(2)
                    .replace(".", ",")}
                </strong>
            </span>

            <input
                type="radio"
                name="tamanhoBebida"
                value="1 Litro"
                data-preco="${Number(preco1L)}"
                checked
            >

        </label>


        <label class="opcao-personalizar">

            <span>
                2 Litros
                <strong class="preco-adicional">
                    R$ ${Number(preco2L)
                    .toFixed(2)
                    .replace(".", ",")}
                </strong>
            </span>

            <input
                type="radio"
                name="tamanhoBebida"
                value="2 Litros"
                data-preco="${Number(preco2L)}"
            >

        </label>


        <div
            id="totalBebida"
            class="total-personalizar"
        >
            Total: R$ ${Number(preco1L)
            .toFixed(2)
            .replace(".", ",")}
        </div>


        <button
            id="confirmarBebida"
            class="botao-confirmar"
        >
            Adicionar ao carrinho
        </button>


        <button
            id="fecharBebida"
            class="botao-fechar"
        >
            Fechar
        </button>

    `;


    fundo.appendChild(caixa);

    document.body.appendChild(fundo);


    const radios =
        caixa.querySelectorAll(
            'input[name="tamanhoBebida"]'
        );


    radios.forEach(function(radio) {

        radio.addEventListener(
            "change",
            function() {

                const valor =
                    Number(
                        radio.dataset.preco
                    );

                document.getElementById(
                    "totalBebida"
                ).textContent =
                    "Total: R$ " +
                    valor
                    .toFixed(2)
                    .replace(".", ",");

            }
        );

    });


    document.getElementById(
        "confirmarBebida"
    ).onclick = function() {

        const escolhido =
            caixa.querySelector(
                'input[name="tamanhoBebida"]:checked'
            );


        const valor =
            Number(
                escolhido.dataset.preco
            );


        carrinho.push({

            nome: nome,

            preco: valor,

            quantidade: 1,

            detalhes: [

                "Tamanho: " +
                escolhido.value

            ]

        });


        salvarCarrinho();

        fundo.remove();

        alert(
            "Bebida adicionada ao carrinho!"
        );

    };


    document.getElementById(
        "fecharBebida"
    ).onclick = function() {

        fundo.remove();

    };

}


// ======================================================
// JANELA DE PERSONALIZAÇÃO
// ======================================================

function abrirPersonalizacao(config) {

    const antigo =
        document.getElementById(
            "personalizarModal"
        );

    if (antigo) antigo.remove();


    const fundo =
        document.createElement("div");

    fundo.id =
        "personalizarModal";

    fundo.className =
        "modal-personalizar";


    const caixa =
        document.createElement("div");

    caixa.className =
        "caixa-personalizar";


    caixa.innerHTML = `

        <h2>
            Personalize seu pedido
        </h2>


        <div style="
            background:white;
            border:2px solid #ffd166;
            border-radius:15px;
            padding:15px;
            margin-bottom:18px;
        ">

            <strong style="
                font-size:22px;
                display:block;
            ">
                ${config.nome}
            </strong>

            <strong style="
                color:#c62828;
                font-size:20px;
            ">
                A partir de R$
                ${config.preco
                .toFixed(2)
                .replace(".", ",")}
            </strong>

        </div>

    `;


    // ==================================================
    // TAMANHO DA PIZZA
    // ==================================================

    if (config.tipo === "pizza") {

        caixa.innerHTML += `

            <h3>
                Tamanho da pizza
            </h3>


            <label class="opcao-personalizar">

                <span>
                    Broto
                    <strong class="preco-adicional">
                        + R$ 0,00
                    </strong>
                </span>

                <input
                    type="radio"
                    name="tamanhoPizza"
                    value="Broto"
                    data-preco="0"
                    checked
                >

            </label>


            <label class="opcao-personalizar">

                <span>
                    Média
                    <strong class="preco-adicional">
                        + R$ 8,00
                    </strong>
                </span>

                <input
                    type="radio"
                    name="tamanhoPizza"
                    value="Média"
                    data-preco="8"
                >

            </label>


            <label class="opcao-personalizar">

                <span>
                    Grande
                    <strong class="preco-adicional">
                        + R$ 15,00
                    </strong>
                </span>

                <input
                    type="radio"
                    name="tamanhoPizza"
                    value="Grande"
                    data-preco="15"
                >

            </label>

        `;

    }


    // ==================================================
    // TAMANHO DA BATATA
    // ==================================================

    if (config.tipo === "batata") {

        caixa.innerHTML += `

            <h3>
                Tamanho
            </h3>


            <label class="opcao-personalizar">

                <span>
                    Pequena
                    <strong class="preco-adicional">
                        + R$ 0,00
                    </strong>
                </span>

                <input
                    type="radio"
                    name="tamanhoBatata"
                    value="Pequena"
                    data-preco="0"
                    checked
                >

            </label>


            <label class="opcao-personalizar">

                <span>
                    Média
                    <strong class="preco-adicional">
                        + R$ 5,00
                    </strong>
                </span>

                <input
                    type="radio"
                    name="tamanhoBatata"
                    value="Média"
                    data-preco="5"
                >

            </label>


            <label class="opcao-personalizar">

                <span>
                    Grande
                    <strong class="preco-adicional">
                        + R$ 10,00
                    </strong>
                </span>

                <input
                    type="radio"
                    name="tamanhoBatata"
                    value="Grande"
                    data-preco="10"
                >

            </label>

        `;

    }


    // ==================================================
    // INGREDIENTES
    // ==================================================

    if (
        config.ingredientes &&
        config.ingredientes.length > 0
    ) {

        caixa.innerHTML += `

            <h3>
                Ingredientes
            </h3>

            <p style="
                color:#666;
                font-size:14px;
            ">
                Desmarque o que você não quer.
            </p>

            <div id="listaIngredientes"></div>

        `;

    }


    // ==================================================
    // ADICIONAIS
    // ==================================================

    if (
        config.adicionais &&
        config.adicionais.length > 0
    ) {

        caixa.innerHTML += `

            <h3>
                Adicionais
            </h3>

            <p style="
                color:#666;
                font-size:14px;
            ">
                Marque o que deseja acrescentar.
            </p>

            <div id="listaAdicionais"></div>

        `;

    }


    // ==================================================
    // TOTAL
    // ==================================================

    caixa.innerHTML += `

        <div
            id="totalPersonalizado"
            class="total-personalizar"
        >
            Total: R$ ${config.preco
            .toFixed(2)
            .replace(".", ",")}
        </div>


        <button
            id="btnConfirmarPersonalizacao"
            class="botao-confirmar"
        >
            Adicionar ao carrinho
        </button>


        <button
            id="btnFecharPersonalizacao"
            class="botao-fechar"
        >
            Fechar
        </button>

    `;


    fundo.appendChild(caixa);

    document.body.appendChild(fundo);


    // ==================================================
    // INGREDIENTES
    // ==================================================

    const listaIngredientes =
        caixa.querySelector(
            "#listaIngredientes"
        );


    if (listaIngredientes) {

        config.ingredientes.forEach(
            function(ingrediente) {

                listaIngredientes.innerHTML += `

                    <label class="opcao-personalizar">

                        <span>
                            ${ingrediente}
                        </span>

                        <input
                            type="checkbox"
                            class="check-ingrediente"
                            data-nome="${ingrediente}"
                            checked
                        >

                    </label>

                `;

            }
        );

    }


    // ==================================================
    // ADICIONAIS
    // ==================================================

    const listaAdicionais =
        caixa.querySelector(
            "#listaAdicionais"
        );


    if (listaAdicionais) {

        config.adicionais.forEach(
            function(adicional, index) {

                listaAdicionais.innerHTML += `

                    <label class="opcao-personalizar">

                        <span>

                            ${adicional.nome}

                            <strong
                                class="preco-adicional"
                            >
                                + R$
                                ${Number(
                                    adicional.preco
                                )
                                .toFixed(2)
                                .replace(".", ",")}
                            </strong>

                        </span>

                        <input
                            type="checkbox"
                            class="check-adicional"
                            data-index="${index}"
                        >

                    </label>

                `;

            }
        );

    }


    // ==================================================
    // ATUALIZAR TOTAL
    // ==================================================

    function atualizarTotal() {

        let total =
            Number(config.preco);


        const tamanho =
            caixa.querySelector(
                'input[name="tamanhoPizza"]:checked,' +
                'input[name="tamanhoBatata"]:checked'
            );


        if (tamanho) {

            total +=
                Number(
                    tamanho.dataset.preco || 0
                );

        }


        caixa
            .querySelectorAll(
                ".check-adicional"
            )
            .forEach(
                function(check) {

                    if (check.checked) {

                        const index =
                            Number(
                                check.dataset.index
                            );

                        total +=
                            Number(
                                config
                                .adicionais[index]
                                .preco
                            );

                    }

                }
            );


        const totalElemento =
            caixa.querySelector(
                "#totalPersonalizado"
            );


        if (totalElemento) {

            totalElemento.textContent =
                "Total: R$ " +
                total
                .toFixed(2)
                .replace(".", ",");

        }

    }


    caixa
        .querySelectorAll(
            'input[name="tamanhoPizza"],' +
            'input[name="tamanhoBatata"],' +
            '.check-adicional'
        )
        .forEach(
            function(input) {

                input.addEventListener(
                    "change",
                    atualizarTotal
                );

            }
        );


    // ==================================================
    // CONFIRMAR
    // ==================================================

    caixa
        .querySelector(
            "#btnConfirmarPersonalizacao"
        )
        .onclick =
        function() {


            let total =
                Number(config.preco);


            let detalhes = [];


            //------------------------------------------
            // INGREDIENTES RETIRADOS
            // ------------------------------------------

            let retirados = [];


            caixa
                .querySelectorAll(
                    ".check-ingrediente"
                )
                .forEach(
                    function(check) {

                        if (!check.checked) {

                            retirados.push(
                                check.dataset.nome
                            );

                        }

                    }
                );


            if (retirados.length > 0) {

                detalhes.push(
                    "Sem: " +
                    retirados.join(", ")
                );

            }


            // ------------------------------------------
            // ADICIONAIS
            // ------------------------------------------

            let escolhidos = [];


            caixa
                .querySelectorAll(
                    ".check-adicional"
                )
                .forEach(
                    function(check) {

                        if (check.checked) {

                            const index =
                                Number(
                                    check.dataset.index
                                );


                            const adicional =
                                config
                                .adicionais[index];


                            total +=
                                Number(
                                    adicional.preco
                                );


                            escolhidos.push(
                                adicional.nome
                            );

                        }

                    }
                );


            if (escolhidos.length > 0) {

                detalhes.push(
                    "Adicionais: " +
                    escolhidos.join(", ")
                );

            }


            // ------------------------------------------
            // CARRINHO
            // ------------------------------------------

            carrinho.push({

                nome: config.nome,

                preco: total,

                quantidade: 1,

                detalhes: detalhes

            });


            salvarCarrinho();


            fundo.remove();


            alert(
                "Produto adicionado ao carrinho!"
            );

        };


    // ==================================================
    // FECHAR
    // ==================================================

    caixa
        .querySelector(
            "#btnFecharPersonalizacao"
        )
        .onclick =
        function() {

            fundo.remove();

        };

}


// ======================================================
// CARRINHO
// ======================================================

function verCarrinho() {

    const antigo =
        document.getElementById(
            "carrinhoModal"
        );

    if (antigo) antigo.remove();


    const fundo =
        document.createElement("div");

    fundo.id =
        "carrinhoModal";

    fundo.style.cssText = `
        position:fixed;
        inset:0;
        background:rgba(0,0,0,.65);
        z-index:99998;
        display:flex;
        align-items:center;
        justify-content:center;
        padding:15px;
    `;


    const caixa =
        document.createElement("div");

    caixa.style.cssText = `
        width:100%;
        max-width:520px;
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
                padding:20px;
            ">
                Seu carrinho está vazio.
            </p>

        `;

    } else {


        carrinho.forEach(
            function(produto, index) {


                const quantidade =
                    Number(
                        produto.quantidade || 1
                    );


                const preco =
                    Number(
                        produto.preco
                    );


                total +=
                    preco * quantidade;


                let detalhesHTML = "";


                if (
                    produto.detalhes &&
                    produto.detalhes.length > 0
                ) {

                    detalhesHTML = `

                        <div style="
                            margin-top:8px;
                            color:#666;
                            font-size:14px;
                            line-height:1.5;
                        ">
                            ${produto.detalhes.join("<br>")}
                        </div>

                    `;

                }


                caixa.innerHTML += `

                    <div style="
                        background:white;
                        border:2px solid #ffd166;
                        border-radius:14px;
                        padding:15px;
                        margin-bottom:12px;
                    ">

                        <strong style="
                            font-size:18px;
                        ">
                            ${produto.nome}
                        </strong>


                        <div style="
                            color:#c62828;
                            font-weight:bold;
                            margin-top:6px;
                        ">
                            R$
                            ${preco
                            .toFixed(2)
                            .replace(".", ",")}
                            cada
                        </div>


                        ${detalhesHTML}


                        <div style="
                            display:flex;
                            align-items:center;
                            gap:10px;
                            margin-top:14px;
                            flex-wrap:wrap;
                        ">

                            <button
                                onclick="diminuirProduto(${index})"
                                style="
                                    padding:9px 16px;
                                    font-size:20px;
                                    border:0;
                                    border-radius:8px;
                                    background:#ffb300;
                                "
                            >
                                −
                            </button>


                            <strong style="
                                font-size:20px;
                            ">
                                ${quantidade}
                            </strong>


                            <button
                                onclick="aumentarProduto(${index})"
                                style="
                                    padding:9px 16px;
                                    font-size:20px;
                                    border:0;
                                    border-radius:8px;
                                    background:#ffb300;
                                "
                            >
                                +
                            </button>


                            <button
                                onclick="removerProduto(${index})"
                                style="
                                    padding:9px 10px;
                                    border:0;
                                    border-radius:8px;
                                    background:#c62828;
                                    color:white;
                                    font-weight:bold;
                                "
                            >
                                Remover
                            </button>

                        </div>

                    </div>

                `;

            }
        );


        caixa.innerHTML += `

            <h2 style="
                text-align:center;
                color:#c62828;
            ">
                Total: R$
                ${total
                .toFixed(2)
                .replace(".", ",")}
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
    ).onclick =
        function() {

            fundo.remove();

        };

}


//
======================================================
// AUMENTAR
// ======================================================

function aumentarProduto(index) {

    if (!carrinho[index]) return;


    carrinho[index].quantidade =
        Number(
            carrinho[index].quantidade || 1
        ) + 1;


    salvarCarrinho();

    verCarrinho();

}


// ======================================================
// DIMINUIR
// ======================================================

function diminuirProduto(index) {

    if (!carrinho[index]) return;


    carrinho[index].quantidade =
        Number(
            carrinho[index].quantidade || 1
        ) - 1;


    if (
        carrinho[index].quantidade <= 0
    ) {

        carrinho.splice(index, 1);

    }


    salvarCarrinho();

    verCarrinho();

}


// ======================================================
// REMOVER
// ======================================================

function removerProduto(index) {

    carrinho.splice(index, 1);

    salvarCarrinho();

    verCarrinho();

}


// ======================================================
// IR PARA PEDIDO
// ======================================================

function irParaPedido() {

    if (carrinho.length === 0) {

        alert(
            "Seu carrinho está vazio."
        );

        return;

    }


    salvarCarrinho();


    window.location.href =
        "pedido.html";

}


// ======================================================
// CATEGORIAS
// ======================================================

function irParaSecao(id) {

    const secao =
        document.getElementById(id);

    if (!secao) return;


    secao.scrollIntoView({
        behavior: "smooth"
    });

}


// ======================================================
// PESQUISA
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        atualizarContador();


        const pesquisa =
            document.querySelector(
                ".pesquisa"
            );


        if (pesquisa) {

            pesquisa.addEventListener(
                "input",
                function() {

                    const termo =
                        pesquisa.value
                        .toLowerCase()
                        .trim();


                    document
                        .querySelectorAll(
                            ".card-produto"
                        )
                        .forEach(
                            function(card) {

                                const texto =
                                    card.textContent
                                    .toLowerCase();


                                card.style.display =
                                    texto.includes(
                                        termo
                                    )
                                    ? ""
                                    : "none";

                            }
                        );

                }
            );

        }

    }
);
