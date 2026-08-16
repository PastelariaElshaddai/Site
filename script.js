// ======================================================
// PASTELARIA EL SHADDAI
// SCRIPT COMPLETO
// ======================================================


// ======================================================
// CARRINHO
// ======================================================

let carrinho =
    JSON.parse(localStorage.getItem("carrinho")) || [];


// ======================================================
// SALVAR
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
// ADICIONAR PRODUTO SIMPLES
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
// PERSONALIZAR PRODUTO
// ======================================================

function personalizarProduto(
    nome,
    preco,
    ingredientes,
    adicionais
) {

    abrirPersonalizacao({

        tipo: "produto",

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

            <span
                id="precoBasePersonalizacao"
                style="
                    color:#c62828;
                    font-weight:bold;
                    font-size:20px;
                "
            >
                R$ ${config.preco.toFixed(2).replace(".", ",")}
            </span>

        </div>

    `;


    // ==================================================
    // TAMANHOS DE PIZZA
    // ==================================================

    if (config.tipo === "pizza") {

        caixa.innerHTML += `

            <h3 style="color:#c62828;">
                Tamanho da pizza
            </h3>

            <div id="tamanhosPizza">

                <label class="opcao-personalizar">

                    <span>
                        Broto
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
                        <span class="preco-adicional">
                            + R$ 8,00
                        </span>
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
                        <span class="preco-adicional">
                            + R$ 15,00
                        </span>
                    </span>

                    <input
                        type="radio"
                        name="tamanhoPizza"
                        value="Grande"
                        data-preco="15"
                    >

                </label>

            </div>

        `;

    }


    // ==================================================
    // TAMANHOS DE BATATA
    // ==================================================

    if (config.tipo === "batata") {

        caixa.innerHTML += `

            <h3 style="color:#c62828;">
                Tamanho
            </h3>

            <div>

                <label class="opcao-personalizar">

                    <span>
                        Pequena
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
                        <span class="preco-adicional">
                            + R$ 5,00
                        </span>
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
                        <span class="preco-adicional">
                            + R$ 10,00
                        </span>
                    </span>

                    <input
                        type="radio"
                        name="tamanhoBatata"
                        value="Grande"
                        data-preco="10"
                    >

                </label>

            </div>

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

            <h3 style="color:#c62828;">
                Ingredientes
            </h3>

            <p style="
                font-size:14px;
                color:#666;
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

            <h3 style="
                color:#c62828;
                margin-top:22px;
            ">
                Adicionais
            </h3>

            <p style="
                font-size:14px;
                color:#666;
            ">
                Marque os adicionais que deseja.
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
    // INGREDIENTES NA TELA
    // ==================================================

    const listaIngredientes =
        caixa.querySelector(
            "#listaIngredientes"
        );


    if (listaIngredientes) {

        config.ingredientes.forEach(
            function(ingrediente, index) {

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
    // ADICIONAIS NA TELA
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

                            <span class="preco-adicional">
                                + R$ ${Number(
                                    adicional.preco
                                ).toFixed(2).replace(".", ",")}
                            </span>

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


        const tamanhoSelecionado =
            caixa.querySelector(
                'input[name="tamanhoPizza"]:checked, input[name="tamanhoBatata"]:checked'
            );


        if (tamanhoSelecionado) {

            total +=
                Number(
                    tamanhoSelecionado.dataset.preco || 0
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
                                config.adicionais[index].preco
                            );

                    }

                }
            );


        const totalElemento =
            caixa.querySelector(
                "#totalPersonalizado"
            );


        totalElemento.textContent =
            "Total: R$ " +
            total.toFixed(2).replace(".", ",");

    }


    caixa
        .querySelectorAll(
            'input[name="tamanhoPizza"], input[name="tamanhoBatata"], .check-adicional'
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


            // ------------------------------
            // TAMANHO
            // ------------------------------

            const tamanho =
                caixa.querySelector(
                    'input[name="tamanhoPizza"]:checked, input[name="tamanhoBatata"]:checked'
                );


            if (tamanho) {

                total +=
                    Number(
                        tamanho.dataset.preco || 0
                    );

                detalhes.push(
                    "Tamanho: " +
                    tamanho.value
                );

            }


            // ------------------------------
            // INGREDIENTES
            // ------------------------------

            const ingredientesRetirados = [];


            caixa
                .querySelectorAll(
                    ".check-ingrediente"
                )
                .forEach(
                    function(check) {

                        if (!check.checked) {

                            ingredientesRetirados.push(
                                check.dataset.nome
                            );

                        }

                    }
                );


            if (
                ingredientesRetirados.length > 0
            ) {

                detalhes.push(
                    "Sem: " +
                    ingredientesRetirados.join(", ")
                );

            }


            // ------------------------------
            // ADICIONAIS
            // ------------------------------

            const adicionaisEscolhidos = [];


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
                                config.adicionais[index];


                            total +=
                                Number(
                                    adicional.preco
                                );


                            adicionaisEscolhidos.push(
                                adicional.nome
                            );

                        }

                    }
                );


            if (
                adicionaisEscolhidos.length > 0
            ) {

                detalhes.push(
                    "Adicionais: " +
                    adicionaisEscolhidos.join(", ")
                );

            }


            // ------------------------------
            // NOME
            // ------------------------------

            let nomeFinal =
                config.nome;


            // ------------------------------
            // CARRINHO
            // ------------------------------

            carrinho.push({

                nome: nomeFinal,

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
                                    </
