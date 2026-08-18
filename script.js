// ======================================================
// PASTELARIA EL SHADDAI
// SCRIPT COMPLETO
// ======================================================


// ======================================================
// CONFIGURAÇÕES
// ======================================================

const WHATSAPP_PASTELARIA = "5585988944421";


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
// FORMATAR DINHEIRO
// ======================================================

function dinheiro(valor) {

    return Number(valor || 0)
        .toFixed(2)
        .replace(".", ",");
}


// ======================================================
// ADICIONAR PRODUTO SIMPLES
// ======================================================

function adicionarProduto(nome, preco) {

    preco = Number(preco);

    const existente =
        carrinho.find(function(item) {

            return (
                item.nome === nome &&
                Number(item.preco) === preco &&
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

            preco: preco,

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

    if (antigo) {

        antigo.remove();

    }


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

            <span style="
                color:#c62828;
                font-weight:bold;
                font-size:20px;
            ">
                R$ ${dinheiro(config.preco)}
            </span>

        </div>

    `;


    // ==================================================
    // TAMANHO DA PIZZA
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
    // TAMANHO DA BATATA
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
    // TOTAL E BOTÕES
    // ==================================================

    caixa.innerHTML += `

        <div
            id="totalPersonalizado"
            class="total-personalizar"
        >
            Total: R$ ${dinheiro(config.preco)}
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
                                + R$ ${dinheiro(adicional.preco)}
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
    // CALCULAR TOTAL
    // ==================================================

    function calcularTotalPersonalizacao() {

        let total =
            Number(config.preco);


        const tamanho =
            caixa.querySelector(
                'input[name="tamanhoPizza"]:checked, input[name="tamanhoBatata"]:checked'
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
                                config.adicionais[index].preco
                            );

                    }

                }
            );


        return total;

    }


    function atualizarTotalPersonalizacao() {

        const total =
            calcularTotalPersonalizacao();


        const elemento =
            caixa.querySelector(
                "#totalPersonalizado"
            );


        if (elemento) {

            elemento.textContent =
                "Total: R$ " +
                dinheiro(total);

        }

    }


    caixa
        .querySelectorAll(
            'input[name="tamanhoPizza"], input[name="tamanhoBatata"], .check-adicional'
        )
        .forEach(
            function(input) {

                input.addEventListener(
                    "change",
                    atualizarTotalPersonalizacao
                );

            }
        );


    // ==================================================
    // CONFIRMAR PERSONALIZAÇÃO
    // ==================================================

    const botaoConfirmar =
        caixa.querySelector(
            "#btnConfirmarPersonalizacao"
        );


    botaoConfirmar.onclick =
        function() {

            let total =
                Number(config.preco);


            const detalhes = [];


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
            // INGREDIENTES RETIRADOS
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
            // ADICIONAR AO CARRINHO
            // ------------------------------

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

    const botaoFechar =
        caixa.querySelector(
            "#btnFecharPersonalizacao"
        );


    botaoFechar.onclick =
        function() {

            fundo.remove();

        };

}


// ======================================================
// TOTAL DO CARRINHO
// ======================================================

function calcularTotalCarrinho() {

    let total = 0;


    carrinho.forEach(
        function(item) {

            total +=
                Number(item.preco || 0) *
                Number(item.quantidade || 1);

        }
    );


    return total;

}


// ======================================================
// RENDERIZAR CARRINHO
// ======================================================

function renderizarCarrinho(caixa) {

    const lista =
        caixa.querySelector(
            "#listaCarrinho"
        );


    const totalElemento =
        caixa.querySelector(
            "#totalCarrinho"
        );


    if (!lista) return;


    if (carrinho.length === 0) {

        lista
