// ======================================================
// PASTELARIA EL SHADDAI
// SCRIPT COMPLETO
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
// CONTADOR
// ======================================================

function atualizarContador() {

    const contador =
        document.getElementById("contador");

    if (contador) {

        contador.innerHTML =
            carrinho.length;
    }
}


// ======================================================
// ADICIONAR PRODUTO SIMPLES
// ======================================================

function adicionarProduto(nome, preco) {

    carrinho.push({

        nome: nome,

        preco: Number(preco)

    });

    salvarCarrinho();

    alert(
        "Produto adicionado ao carrinho!"
    );
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

    // Remove janela anterior
    const antiga =
        document.getElementById(
            "modalPersonalizar"
        );

    if (antiga) {
        antiga.remove();
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
        width:100%;
        height:100%;
        background:rgba(0,0,0,0.65);
        display:flex;
        justify-content:center;
        align-items:center;
        z-index:99999;
        padding:15px;
        box-sizing:border-box;
    `;


    // ==================================================
    // CAIXA
    // ==================================================

    const caixa =
        document.createElement("div");


    caixa.style.cssText = `
        background:#fff8e7;
        width:100%;
        max-width:500px;
        max-height:90vh;
        overflow-y:auto;
        border:4px solid #ffb300;
        border-radius:25px;
        padding:20px;
        box-sizing:border-box;
        box-shadow:0 10px 30px rgba(0,0,0,0.35);
    `;


    // ==================================================
    // TÍTULO
    // ==================================================

    const titulo =
        document.createElement("h2");


    titulo.innerHTML =
        "Personalize seu pedido";


    titulo.style.cssText = `
        color:#c62828;
        text-align:center;
        margin:5px 0 20px;
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
        margin-bottom:25px;
    `;


    produtoInfo.innerHTML = `

        <strong style="
            font-size:24px;
            color:#222;
        ">
            ${nome}
        </strong>

        <div style="
            color:#c62828;
            font-size:24px;
            font-weight:bold;
            margin-top:8px;
        ">
            R$ ${Number(preco).toFixed(2)}
        </div>

    `;


    caixa.appendChild(produtoInfo);


    // ==================================================
    // INGREDIENTES
    // ==================================================

    if (
        ingredientes &&
        ingredientes.length > 0
    ) {

        const tituloIngredientes =
            document.createElement("h3");


        tituloIngredientes.innerHTML =
            "Ingredientes";


        tituloIngredientes.style.cssText = `
            color:#c62828;
            font-size:22px;
            margin-bottom:10px;
        `;


        caixa.appendChild(
            tituloIngredientes
        );


        ingredientes.forEach(
            function(ingrediente, indice) {

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
                    cursor:pointer;
                    box-sizing:border-box;
                `;


                linha.innerHTML = `

                    <span style="
                        font-size:19px;
                    ">
                        ${ingrediente}
                    </span>

                    <input
                        type="checkbox"
                        checked
                        style="
                            width:28px;
                            height:28px;
                            accent-color:#ffb300;
                        "
                        data-ingrediente="${indice}"
                    >

                `;


                caixa.appendChild(linha);
            }
        );
    }


    // ==================================================
    // ADICIONAIS
    // ==================================================

    const caixasAdicionais = [];


    if (
        adicionais &&
        adicionais.length > 0
    ) {

        const tituloAdicionais =
            document.createElement("h3");


        tituloAdicionais.innerHTML =
            "Adicionais";


        tituloAdicionais.style.cssText = `
            color:#c62828;
            font-size:22px;
            margin-top:25px;
            margin-bottom:10px;
        `;


        caixa.appendChild(
            tituloAdicionais
        );


        adicionais.forEach(
            function(adicional, indice) {

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
                    cursor:pointer;
                    box-sizing:border-box;
                `;


                linha.innerHTML = `

                    <span style="
                        font-size:18px;
                    ">

                        ${adicional.nome}

                        <strong style="
                            color:#c62828;
                            margin-left:8px;
                        ">
                            + R$ ${Number(
                                adicional.preco
                            ).toFixed(2)}
                        </strong>

                    </span>

                    <input
                        type="checkbox"
                        style="
                            width:28px;
                            height:28px;
                            accent-color:#ffb300;
                        "
                        data-adicional="${indice}"
                    >

                `;


                const checkbox =
                    linha.querySelector(
                        "input"
                    );


                caixasAdicionais.push({
                    adicional:
                        adicional,
                    checkbox:
                        checkbox
                });


                caixa.appendChild(linha);
            }
        );
    }


    // ==================================================
    // TOTAL
    // ==================================================

    const totalCaixa =
        document.createElement("div");


    totalCaixa.style.cssText = `
        background:white;
        border:2px solid #ffd166;
        border-radius:18px;
        padding:18px;
        margin-top:25px;
        text-align:center;
    `;


    const totalTexto =
        document.createElement("div");


    totalTexto.style.cssText = `
        color:#c62828;
        font-size:25px;
        font-weight:bold;
    `;


    function atualizarTotalPersonalizado() {

        let total =
            Number(preco);


        caixasAdicionais.forEach(
            function(item) {

                if (
                    item.checkbox.checked
                ) {

                    total +=
                        Number(
                            item.adicional.preco
                        );
                }
            }
        );


        totalTexto.innerHTML =
            "Total: R$ " +
            total.toFixed(2);
    }


    totalCaixa.appendChild(
        totalTexto
    );


    caixa.appendChild(
        totalCaixa
    );


    caixasAdicionais.forEach(
        function(item) {

            item.checkbox.addEventListener(
                "change",
                atualizarTotalPersonalizado
            );

        }
    );


    atualizarTotalPersonalizado();


    // ==================================================
    // BOTÃO ADICIONAR AO CARRINHO
    // ==================================================

    const botaoAdicionar =
        document.createElement("button");


    botaoAdicionar.innerHTML =
        "Adicionar ao carrinho";


    botaoAdicionar.style.cssText = `
        width:100%;
        padding:17px;
        margin-top:18px;
        background:#ffb300;
        color:#222;
        border:none;
        border-radius:15px;
        font-size:19px;
        font-weight:bold;
        cursor:pointer;
    `;


    botaoAdicionar.onclick =
        function() {

            let precoFinal =
                Number(preco);


            let nomesAdicionais =
                [];


            caixasAdicionais.forEach(
                function(item) {

                    if (
                        item.checkbox.checked
                    ) {

                        precoFinal +=
                            Number(
                                item.adicional.preco
                            );


                        nomesAdicionais.push(
                            item.adicional.nome
                        );
                    }
                }
            );


            let nomeFinal =
                nome;


            if (
                nomesAdicionais.length > 0
            ) {

                nomeFinal +=
                    " + " +
                    nomesAdicionais.join(", ");
            }


            carrinho.push({

                nome:
                    nomeFinal,

                preco:
                    precoFinal

            });


            salvarCarrinho();


            fundo.remove();


            // Abre o carrinho automaticamente
            verCarrinho();
        };


    caixa.appendChild(
        botaoAdicionar
    );


    // ==================================================
    // BOTÃO CANCELAR
    // ==================================================

    const botaoCancelar =
        document.createElement("button");


    botaoCancelar.innerHTML =
        "Cancelar";


    botaoCancelar.style.cssText = `
        width:100%;
        padding:15px;
        margin-top:10px;
        background:white;
        color:#c62828;
        border:3px solid #c62828;
        border-radius:15px;
        font-size:18px;
        font-weight:bold;
        cursor:pointer;
    `;


    botaoCancelar.onclick =
        function() {

            fundo.remove();

        };


    caixa.appendChild(
        botaoCancelar
    );


    // ==================================================
    // MOSTRAR
    // ==================================================

    fundo.appendChild(
        caixa
    );

    document.body.appendChild(
        fundo
    );
}


// ======================================================
// VER CARRINHO
// ======================================================

function verCarrinho() {

    const anterior =
        document.getElementById(
            "fundoCarrinho"
        );


    if (anterior) {
        anterior.remove();
    }


    if (
        carrinho.length === 0
    ) {

        return;
    }


    // ==================================================
    // AGRUPAR PRODUTOS
    // ==================================================

    const grupos = {};


    carrinho.forEach(
        function(produto) {

            const chave =
                String(produto.nome) +
                "|" +
                Number(produto.preco);


            if (!grupos[chave]) {

                grupos[chave] = {

                    nome:
                        produto.nome,

                    preco:
                        Number(
                            produto.preco
                        ),

                    quantidade:
                        0
                };
            }


            grupos[chave].quantidade++;
        }
    );


    // ==================================================
    // FUNDO
    // ==================================================

    const fundo =
        document.createElement("div");


    fundo.id =
        "fundoCarrinho";


    fundo.style.cssText = `
        position:fixed;
        inset:0;
        width:100%;
        height:100%;
        background:rgba(0,0,0,0.65);
        display:flex;
        justify-content:center;
        align-items:center;
        z-index:99998;
        padding:15px;
        box-sizing:border-box;
    `;


    // ==================================================
    // CAIXA
    // ==================================================

    const caixa =
        document.createElement("div");


    caixa.style.cssText = `
        background:#fff8e7;
        width:100%;
        max-width:500px;
        max-height:85vh;
        overflow-y:auto;
        border:4px solid #ffb300;
        border-radius:25px;
        padding:20px;
        box-sizing:border-box;
        box-shadow:0 10px 30px rgba(0,0,0,0.4);
    `;


    // ==================================================
    // TÍTULO
    // ==================================================

    const titulo =
        document.createElement("h2");


    titulo.innerHTML =
        "Seu Carrinho";


    titulo.style.cssText = `
        color:#c62828;
        text-align:center;
        margin:5px 0 20px;
        font-size:28px;
    `;


    caixa.appendChild(
        titulo
    );


    // ==================================================
    // TOTAL
    // ==================================================

    let total =
        0;


    Object.values(grupos).forEach(
        function(produto) {

            total +=
                produto.preco *
                produto.quantidade;


            const item =
                document.createElement("div");


            item.style.cssText = `
                background:white;
                border:2px solid #ffd166;
                border-radius:15px;
                padding:15px;
                margin-bottom:12px;
                box-sizing:border-box;
            `;


            // Nome
            const nomeProduto =
                document.createElement("strong");


            nomeProduto.innerHTML =
                produto.nome;


            nomeProduto.style.cssText = `
                display:block;
                font-size:19px;
                color:#222;
                margin-bottom:6px;
            `;


            item.appendChild(
                nomeProduto
            );


            // Preço
            const precoProduto =
                document.createElement("div");


            precoProduto.innerHTML =
                "R$ " +
                produto.preco.toFixed(2) +
                " cada";


            precoProduto.style.cssText = `
                color:#555;
                margin-bottom:15px;
            `;


            item.appendChild(
                precoProduto
            );


            // Área dos botões
            const controles =
                document.createElement("div");


            controles.style.cssText = `
                display:flex;
                align-items:center;
                gap:10px;
            `;


            // MENOS
            const menos =
                document.createElement("button");


            menos.innerHTML =
                "−";


            menos.style.cssText = `
                background:#ffb300;
                color:#222;
                border:none;
                border-radius:10px;
                width:48px;
                height:45px;
                font-size:25px;
                font-weight:bold;
                cursor:pointer;
            `;


            menos.onclick =
                function() {

                    diminuirProduto(
                        produto.nome,
                        produto.preco
                    );
                };


            // QUANTIDADE
            const quantidade =
                document.createElement("strong");


            quantidade.innerHTML =
                produto.quantidade;


            quantidade.style.cssText = `
                font-size:20px;
                min-width:30px;
                text-align:center;
            `;


            // MAIS
            const mais =
                document.createElement("button");


            mais.innerHTML =
                "+";


            mais.style.cssText = `
                background:#ffb300;
                color:#222;
                border:none;
                border-radius:10px;
                width:48px;
                height:45px;
                font-size:25px;
                font-weight:bold;
                cursor:pointer;
            `;


            mais.onclick =
                function() {

                    aumentarProduto(
                        produto.nome,
                        produto.preco
                    );
                };


            // REMOVER
            const remover =
                document.createElement("button");


            remover.innerHTML =
                "Remover";


            remover.style.cssText = `
                background:#c62828;
                color:white;
                border:none;
                border-radius:10px;
                padding:12px;
                font-size:15px;
                font-weight:bold;
                cursor:pointer;
                margin-left:auto;
            `;


            remover.onclick =
                function() {

                    removerProduto(
                        produto.nome,
                        produto.preco
                    );
                };


            controles.appendChild(
                menos
            );

            controles.appendChild(
                quantidade
            );

            controles.appendChild(
                mais
            );

            controles.appendChild(
                remover
            );


            item.appendChild(
                controles
            );


            caixa.appendChild(
                item
            );
        }
    );


    // =================================================
