// ======================================================
// PASTELARIA EL SHADDAI - SCRIPT COMPLETO
// ======================================================


// ======================================================
// CARRINHO
// ======================================================

let carrinho = JSON.parse(
    localStorage.getItem("carrinho")
) || [];


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
// CONTADOR DO CARRINHO
// ======================================================

function atualizarContador() {

    const contador =
        document.getElementById("contador");

    if (!contador) return;

    let quantidade = 0;

    carrinho.forEach(function(produto) {

        quantidade += Number(
            produto.quantidade || 1
        );

    });

    contador.textContent = quantidade;
}


// ======================================================
// ADICIONAR PRODUTO SIMPLES
// ======================================================

function adicionarProduto(nome, preco) {

    const produtoExistente =
        carrinho.find(function(produto) {

            return (
                produto.nome === nome &&
                Number(produto.preco) === Number(preco)
            );

        });


    if (produtoExistente) {

        produtoExistente.quantidade =
            Number(produtoExistente.quantidade || 1) + 1;

    } else {

        carrinho.push({

            nome: nome,

            preco: Number(preco),

            quantidade: 1

        });

    }


    salvarCarrinho();

    verCarrinho();
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

    // Remove modal antigo, se existir

    const modalAntigo =
        document.getElementById("modalPersonalizar");

    if (modalAntigo) {

        modalAntigo.remove();

    }


    // ==================================================
    // FUNDO
    // ==================================================

    const fundo =
        document.createElement("div");

    fundo.id =
        "modalPersonalizar";


    fundo.style.cssText = `
        position:fixed;
        inset:0;
        background:rgba(0,0,0,0.65);
        display:flex;
        justify-content:center;
        align-items:center;
        z-index:99999;
        padding:15px;
        box-sizing:border-box;
        overflow-y:auto;
    `;


    // ==================================================
    // CAIXA
    // ==================================================

    const caixa =
        document.createElement("div");


    caixa.style.cssText = `
        background:#fff8e7;
        width:100%;
        max-width:520px;
        max-height:92vh;
        overflow-y:auto;
        border:5px solid #ffb300;
        border-radius:25px;
        padding:22px;
        box-sizing:border-box;
        box-shadow:0 10px 30px rgba(0,0,0,0.35);
    `;


    fundo.appendChild(caixa);


    // ==================================================
    // TÍTULO
    // ==================================================

    const titulo =
        document.createElement("h2");


    titulo.textContent =
        "Personalize seu pedido";


    titulo.style.cssText = `
        color:#c62828;
        text-align:center;
        margin:0 0 20px;
        font-size:28px;
    `;


    caixa.appendChild(titulo);


    // ==================================================
    // PRODUTO
    // ==================================================

    const produtoInfo =
        document.createElement("div");


    produtoInfo.style.cssText = `
        background:white;
        border:2px solid #ffd166;
        border-radius:18px;
        padding:18px;
        margin-bottom:22px;
    `;


    produtoInfo.innerHTML = `

        <strong style="
            font-size:24px;
            display:block;
            margin-bottom:8px;
        ">
            ${nome}
        </strong>

        <strong
            id="precoPersonalizado"
            style="
                color:#c62828;
                font-size:23px;
            "
        >
            R$ ${Number(preco).toFixed(2)}
        </strong>

    `;


    caixa.appendChild(produtoInfo);


    // ==================================================
    // INGREDIENTES
    // ==================================================

    if (
        Array.isArray(ingredientes) &&
        ingredientes.length > 0
    ) {

        const tituloIngredientes =
            document.createElement("h3");


        tituloIngredientes.textContent =
            "Ingredientes";


        tituloIngredientes.style.cssText = `
            color:#c62828;
            font-size:22px;
            margin:15px 0 10px;
        `;


        caixa.appendChild(
            tituloIngredientes
        );


        ingredientes.forEach(
            function(ingrediente, index) {

                const linha =
                    document.createElement("label");


                linha.style.cssText = `
                    display:flex;
                    align-items:center;
                    justify-content:space-between;
                    background:white;
                    border:2px solid #ddd;
                    border-radius:15px;
                    padding:15px;
                    margin-bottom:10px;
                    font-size:19px;
                    cursor:pointer;
                    box-sizing:border-box;
                `;


                linha.innerHTML = `

                    <span>
                        ${ingrediente}
                    </span>

                    <input
                        type="checkbox"
                        id="ingrediente_${index}"
                        checked
                        style="
                            width:28px;
                            height:28px;
                            accent-color:#ffb300;
                        "
                    >

                `;


                caixa.appendChild(linha);

            }
        );

    }


    // ==================================================
    // ADICIONAIS
    // ==================================================

    if (
        Array.isArray(adicionais) &&
        adicionais.length > 0
    ) {

        const tituloAdicionais =
            document.createElement("h3");


        tituloAdicionais.textContent =
            "Adicionais";


        tituloAdicionais.style.cssText = `
            color:#c62828;
            font-size:22px;
            margin:25px 0 10px;
        `;


        caixa.appendChild(
            tituloAdicionais
        );


        adicionais.forEach(
            function(adicional, index) {

                const linha =
                    document.createElement("label");


                linha.style.cssText = `
                    display:flex;
                    align-items:center;
                    justify-content:space-between;
                    background:white;
                    border:2px solid #ddd;
                    border-radius:15px;
                    padding:15px;
                    margin-bottom:10px;
                    font-size:18px;
                    cursor:pointer;
                    box-sizing:border-box;
                `;


                linha.innerHTML = `

                    <span>

                        ${adicional.nome}

                        <strong style="
                            color:#c62828;
                            margin-left:6px;
                        ">
                            + R$ ${Number(adicional.preco).toFixed(2)}
                        </strong>

                    </span>

                    <input
                        type="checkbox"
                        class="adicional-checkbox"
                        data-index="${index}"
                        style="
                            width:28px;
                            height:28px;
                            accent-color:#ffb300;
                        "
                    >

                `;


                caixa.appendChild(linha);

            }
        );

    }


    // ==================================================
    // TOTAL
    // ==================================================

    const totalBox =
        document.createElement("div");


    totalBox.style.cssText = `
        background:white;
        border:3px solid #ffd166;
        border-radius:18px;
        padding:18px;
        margin-top:25px;
        text-align:center;
    `;


    totalBox.innerHTML = `

        <strong
            id="totalPersonalizado"
            style="
                color:#c62828;
                font-size:25px;
            "
        >
            Total: R$ ${Number(preco).toFixed(2)}
        </strong>

    `;


    caixa.appendChild(totalBox);


    // ==================================================
    // ATUALIZAR TOTAL
    // ==================================================

    function atualizarTotal() {

        let total =
            Number(preco);


        const checks =
            caixa.querySelectorAll(
                ".adicional-checkbox"
            );


        checks.forEach(
            function(check) {

                if (check.checked) {

                    const indice =
                        Number(
                            check.dataset.index
                        );


                    total += Number(
                        adicionais[indice].preco
                    );

                }

            }
        );


        const totalTexto =
            document.getElementById(
                "totalPersonalizado"
            );


        if (totalTexto) {

            totalTexto.textContent =
                "Total: R$ " +
                total.toFixed(2);

        }

    }


    // ==================================================
    // EVENTO DOS ADICIONAIS
    // ==================================================

    const checkboxes =
        caixa.querySelectorAll(
            ".adicional-checkbox"
        );


    checkboxes.forEach(
        function(check) {

            check.addEventListener(
                "change",
                atualizarTotal
            );

        }
    );


    // ==================================================
    // BOTÃO ADICIONAR AO CARRINHO
    // ==================================================

    const botaoAdicionar =
        document.createElement("button");


    botaoAdicionar.textContent =
        "Adicionar ao carrinho";


    botaoAdicionar.style.cssText = `
        width:100%;
        background:#ffb300;
        color:#222;
        border:none;
        border-radius:15px;
        padding:18px;
        margin-top:20px;
        font-size:21px;
        font-weight:bold;
        cursor:pointer;
    `;


    caixa.appendChild(
        botaoAdicionar
    );


    botaoAdicionar.onclick =
        function() {

            let total =
                Number(preco);


            let adicionaisEscolhidos =
                [];


            checkboxes.forEach(
                function(check) {

                    if (check.checked) {

                        const indice =
                            Number(
                                check.dataset.index
                            );


                        const adicional =
                            adicionais[indice];


                        adicionaisEscolhidos.push(
                            adicional
                        );


                        total += Number(
                            adicional.preco
                        );

                    }

                }
            );


            let nomeFinal =
                nome;


            if (
                adicionaisEscolhidos.length > 0
            ) {

                nomeFinal +=
                    " + " +
                    adicionaisEscolhidos
                        .map(
                            function(adicional) {

                                return adicional.nome;

                            }
                        )
                        .join(", ");

            }


            // Adiciona como um produto
            // independente no carrinho

            carrinho.push({

                nome: nomeFinal,

                preco: total,

                quantidade: 1

            });


            salvarCarrinho();


            fundo.remove();


            verCarrinho();

        };


    // ==================================================
    // BOTÃO FECHAR
    // ==================================================

    const botaoFechar =
        document.createElement("button");


    botaoFechar.textContent =
        "Fechar";


    botaoFechar.style.cssText = `
        width:100%;
        background:white;
        color:#c62828;
        border:3px solid #c62828;
        border-radius:15px;
        padding:15px;
        margin-top:12px;
        font-size:20px;
        font-weight:bold;
        cursor:pointer;
    `;


    caixa.appendChild(
        botaoFechar
    );


    botaoFechar.onclick =
        function() {

            fundo.remove();

        };


    // ==================================================
    // MOSTRAR MODAL
    // ==================================================

    document.body.appendChild(
        fundo
    );

}


// ======================================================
// AUMENTAR PRODUTO
// ======================================================

function aumentarProduto(nome, preco) {

    const produto =
        carrinho.find(
            function(item) {

                return (
                    item.nome === nome &&
                    Number(item.preco) === Number(preco)
                );

            }
        );


    if (produto) {

        produto.quantidade =
            Number(produto.quantidade || 1) + 1;

    }


    salvarCarrinho();

    verCarrinho();
}


// ======================================================
// DIMINUIR PRODUTO
// ======================================================

function diminuirProduto(nome, preco) {

    const produto =
        carrinho.find(
            function(item) {

                return (
                    item.nome === nome &&
                    Number(item.preco) === Number(preco)
                );

            }
        );


    if (!produto) return;


    produto.quantidade =
        Number(produto.quantidade || 1) - 1;


    if (produto.quantidade <= 0) {

        carrinho =
            carrinho.filter(
                function(item) {

                    return !(
                        item.nome === nome &&
                        Number(item.preco) === Number(preco)
                    );

                }
            );

    }


    salvarCarrinho();

    verCarrinho();
}


// ======================================================
// REMOVER PRODUTO
// ======================================================

function removerProduto(nome, preco) {

    carrinho =
        carrinho.filter(
            function(item) {

                return !(
                    item.nome === nome &&
                    Number(item.preco) === Number(preco)
                );

            }
        );


    salvarCarrinho();

    verCarrinho();
}


// ======================================================
// ABRIR CARRINHO
// ======================================================

function verCarrinho() {

    const antigo =
        document.getElementById(
            "modalCarrinho"
        );


    if (antigo) {

        antigo.remove();

    }


    const fundo =
        document.createElement("div");


    fundo.id =
        "modalCarrinho";


    fundo.style.cssText = `
        position:fixed;
        inset:0;
        background:rgba(0,0,0,0.65);
        display:flex;
        justify-content:center;
        align-items:center;
        z-index:99998;
        padding:15px;
        box-sizing:border-box;
        overflow-y:auto;
    `;


    const caixa =
        document.createElement("div");


    caixa.style.cssText = `
        background:#fff8e7;
        width:100%;
        max-width:520px;
        max-height:90vh;
        overflow-y:auto;
        border:5px solid #ffb300;
        border-radius:25px;
        padding:22px;
        box-sizing:border-box;
    `;


    fundo.appendChild(
        caixa
    );


    // ==================================================
    // TÍTULO
    // ==================================================

    const titulo =
        document.createElement("h2");


    titulo.textContent =
        "Seu Carrinho";


    titulo.style.cssText = `
        color:#c62828;
        text-align:center;
        font-size:28px;
        margin-top:0;
    `;


    caixa.appendChild(
        titulo
    );


    // ==================================================
    // CARRINHO VAZIO
    // ==================================================

    if (carrinho.length === 0) {

        const vazio =
            document.createElement("p");


        vazio.textContent =
            "Seu carrinho está vazio.";


        vazio.style.cssText = `
            text-align:center;
            font-size:20px;
            padding:25px;
        `;


        caixa.appendChild(
            vazio
        );


    } else {

        let total = 0;


        carrinho.forEach(
            function(produto) {

                const quantidade =
                    Number(
                        produto.quantidade || 1
                    );


                total +=
                    Number(produto.preco) *
                    quantidade;


                const item =
                    document.createElement("div");


                item.style.cssText = `
                    background:white;
                    border:2px solid #ffd166;
                    border-radius:16px;
                    padding:15px;
                    margin-bottom:12px;
                `;


                item.innerHTML = `

                    <strong style="
                        display:block;
                        font-size:19px;
                        margin-bottom:7px;
                    ">
                        ${produto.nome}
                    </strong>

                    <span style="
                        font-size:17px;
                    ">
                        R$ ${Number(produto.preco).toFixed(2)}
                        cada
                    </span>

                    <div style="
                        display:flex;
                        align-items:center;
                        margin-top:14px;
                        gap:10px;
                    ">

                        <button
                            class="btnMenos"
                            style="
                                background:#ffb300;
                                border:none;
                                border-radius:10px;
                                padding:10px 17px;
                                font-size:21px;
                                font-weight:bold;
                                cursor:pointer;
                            "
                        >
                            −
                        </button>

                        <strong
                            style="
                                font-size:20px;
                                min-width:25px;
                                text-align:center;
                            "
                        >
                            ${quantidad
