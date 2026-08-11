// ======================================================
// PASTELARIA EL SHADDAI
// SCRIPT.JS COMPLETO
// ======================================================


// ======================================================
// CARRINHO
// ======================================================

let carrinho = JSON.parse(
    localStorage.getItem("carrinho")
) || [];


// ======================================================
// ATUALIZAR CONTADOR DO CARRINHO
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
// ADICIONAR PRODUTO SIMPLES
// ======================================================

function adicionarProduto(nome, preco) {

    carrinho.push({

        nome: nome,

        preco: Number(preco)

    });

    salvarCarrinho();

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

    // Se já existir uma janela, remove
    let janelaExistente =
        document.getElementById(
            "modalPersonalizar"
        );

    if (janelaExistente) {
        janelaExistente.remove();
    }


    // ==================================================
    // FUNDO
    // ==================================================

    let fundo =
        document.createElement("div");

    fundo.id =
        "modalPersonalizar";

    fundo.style.cssText = `
        position: fixed;
        inset: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.65);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        padding: 15px;
        box-sizing: border-box;
    `;


    // ==================================================
    // CAIXA
    // ==================================================

    let caixa =
        document.createElement("div");

    caixa.style.cssText = `
        background: #fff8e7;
        width: 100%;
        max-width: 450px;
        max-height: 90vh;
        overflow-y: auto;
        border-radius: 22px;
        padding: 22px;
        box-sizing: border-box;
        border: 4px solid #ffb300;
        box-shadow: 0 10px 30px rgba(0,0,0,0.35);
    `;


    // ==================================================
    // TÍTULO
    // ==================================================

    let titulo =
        document.createElement("h2");

    titulo.innerHTML =
        "Personalize seu pedido";

    titulo.style.cssText = `
        margin: 0 0 18px 0;
        color: #c62828;
        text-align: center;
        font-size: 25px;
    `;

    caixa.appendChild(titulo);


    // ==================================================
    // PRODUTO
    // ==================================================

    let produto =
        document.createElement("div");

    produto.style.cssText = `
        background: white;
        padding: 15px;
        border-radius: 12px;
        margin-bottom: 20px;
        border: 1px solid #ffd166;
    `;

    produto.innerHTML = `

        <strong style="
            font-size:20px;
        ">
            ${nome}
        </strong>

        <div style="
            color:#c62828;
            font-size:20px;
            font-weight:bold;
            margin-top:6px;
        ">
            R$ ${Number(preco).toFixed(2)}
        </div>

    `;

    caixa.appendChild(produto);


    // ==================================================
    // INGREDIENTES
    // ==================================================

    if (
        ingredientes &&
        ingredientes.length > 0
    ) {

        let tituloIngredientes =
            document.createElement("h3");

        tituloIngredientes.innerHTML =
            "Ingredientes";

        tituloIngredientes.style.cssText = `
            color:#c62828;
            margin-bottom:10px;
        `;

        caixa.appendChild(
            tituloIngredientes
        );


        ingredientes.forEach(
            function(ingrediente) {

                let linha =
                    document.createElement("label");

                linha.style.cssText = `
                    display:flex;
                    align-items:center;
                    justify-content:space-between;
                    background:white;
                    padding:14px;
                    margin:8px 0;
                    border-radius:10px;
                    border:1px solid #ddd;
                    font-size:17px;
                    cursor:pointer;
                    box-sizing:border-box;
                `;

                linha.innerHTML = `

                    <span>
                        ${ingrediente}
                    </span>

                    <input
                        type="checkbox"
                        class="ingrediente-checkbox"
                        value="${ingrediente}"
                        checked
                        style="
                            width:22px;
                            height:22px;
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
        adicionais &&
        adicionais.length > 0
    ) {

        let tituloAdicionais =
            document.createElement("h3");

        tituloAdicionais.innerHTML =
            "Adicionais";

        tituloAdicionais.style.cssText = `
            color:#c62828;
            margin-top:22px;
            margin-bottom:10px;
        `;

        caixa.appendChild(
            tituloAdicionais
        );


        adicionais.forEach(
            function(adicional, index) {

                let linha =
                    document.createElement("label");

                linha.style.cssText = `
                    display:flex;
                    align-items:center;
                    justify-content:space-between;
                    background:white;
                    padding:14px;
                    margin:8px 0;
                    border-radius:10px;
                    border:1px solid #ddd;
                    font-size:17px;
                    cursor:pointer;
                    box-sizing:border-box;
                `;

                linha.innerHTML = `

                    <span>

                        ${adicional.nome}

                        <strong style="
                            color:#c62828;
                            margin-left:5px;
                        ">
                            + R$
                            ${Number(
                                adicional.preco
                            ).toFixed(2)}
                        </strong>

                    </span>

                    <input
                        type="checkbox"
                        class="adicional-checkbox"
                        data-index="${index}"
                        style="
                            width:22px;
                            height:22px;
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

    let areaTotal =
        document.createElement("div");

    areaTotal.style.cssText = `
        margin-top:20px;
        padding:15px;
        background:white;
        border-radius:12px;
        text-align:center;
        border:2px solid #ffd166;
    `;

    caixa.appendChild(areaTotal);


    // ==================================================
    // ATUALIZAR TOTAL
    // ==================================================

    function atualizarTotal() {

        let total =
            Number(preco);


        let selecionados =
            caixa.querySelectorAll(
                ".adicional-checkbox:checked"
            );


        selecionados.forEach(
            function(campo) {

                let index =
                    Number(
                        campo.dataset.index
                    );

                total +=
                    Number(
                        adicionais[index].preco
                    );

            }
        );


        areaTotal.innerHTML = `

            <strong style="
                font-size:22px;
                color:#c62828;
            ">

                Total: R$
                ${total.toFixed(2)}

            </strong>

        `;

        return total;

    }


    atualizarTotal();


    // Atualiza o preço quando marcar/desmarcar
    caixa.addEventListener(
        "change",
        function(event) {

            if (
                event.target.classList.contains(
                    "adicional-checkbox"
                )
            ) {

                atualizarTotal();

            }

        }
    );


    // ==================================================
    // BOTÃO ADICIONAR
    // ==================================================

    let botaoAdicionar =
        document.createElement("button");

    botaoAdicionar.innerHTML =
        "Adicionar ao carrinho";


    botaoAdicionar.style.cssText = `
        width:100%;
        padding:16px;
        margin-top:20px;
        border:none;
        border-radius:12px;
        background:#ffb300;
        color:#222;
        font-size:18px;
        font-weight:bold;
        cursor:pointer;
    `;


    botaoAdicionar.onclick =
        function() {

            let selecionados = [];


            let campos =
                caixa.querySelectorAll(
                    ".adicional-checkbox:checked"
                );


            campos.forEach(
                function(campo) {

                    let index =
                        Number(
                            campo.dataset.index
                        );

                    selecionados.push(
                        adicionais[index]
                    );

                }
            );


            // ==========================================
            // INGREDIENTES ESCOLHIDOS
            // ==========================================

            let ingredientesEscolhidos = [];


            let ingredientesMarcados =
                caixa.querySelectorAll(
                    ".ingrediente-checkbox:checked"
                );


            ingredientesMarcados.forEach(
                function(campo) {

                    ingredientesEscolhidos.push(
                        campo.value
                    );

                }
            );


            // ==========================================
            // NOME FINAL
            // ==========================================

            let nomeFinal =
                nome;


            if (
                selecionados.length > 0
            ) {

                nomeFinal +=
                    " + " +
                    selecionados
                        .map(
                            function(adicional) {
                                return adicional.nome;
                            }
                        )
                        .join(", ");

            }


            // ==========================================
            // PREÇO FINAL
            // ==========================================

            let precoFinal =
                Number(preco);


            selecionados.forEach(
                function(adicional) {

                    precoFinal +=
                        Number(
                            adicional.preco
                        );

                }
            );


            // ==========================================
            // ADICIONA AO CARRINHO
            // ==========================================

            carrinho.push({

                nome: nomeFinal,

                preco: precoFinal,

                ingredientes:
                    ingredientesEscolhidos,

                adicionais:
                    selecionados.map(
                        function(adicional) {
                            return adicional.nome;
                        }
                    )

            });


            salvarCarrinho();


            fundo.remove();


            // Mensagem simples
            alert(
                "Produto adicionado ao carrinho!"
            );

        };


    caixa.appendChild(
        botaoAdicionar
    );


    // ==================================================
    // BOTÃO CANCELAR
    // ==================================================

    let botaoFechar =
        document.createElement("button");

    botaoFechar.innerHTML =
        "Cancelar";


    botaoFechar.style.cssText = `
        width:100%;
        padding:14px;
        margin-top:10px;
        border:2px solid #c62828;
        border-radius:12px;
        background:white;
        color:#c62828;
        font-size:17px;
        font-weight:bold;
        cursor:pointer;
    `;


    botaoFechar.onclick =
        function() {

            fundo.remove();

        };


    caixa.appendChild(
        botaoFechar
    );


    // ==================================================
    // MOSTRAR JANELA
    // ==================================================

    fundo.appendChild(caixa);

    document.body.appendChild(fundo);

}


// ======================================================
// ABRIR CARRINHO
// ======================================================

function verCarrinho() {

    if (
        carrinho.length === 0
    ) {
        return;
    }


    // Remove carrinho anterior
    let antigo =
        document.getElementById(
            "fundoCarrinho"
        );

    if (antigo) {
        antigo.remove();
    }


    // ==================================================
    // AGRUPAR PRODUTOS
    // ==================================================

    let grupos = {};


    carrinho.forEach(
        function(produto) {

            let chave =
                produto.nome +
                "|" +
                produto.preco;


            if (!grupos[chave]) {

                grupos[chave] = {

                    nome:
                        produto.nome,

                    preco:
                        Number(
                            produto.preco
                        ),

                    quantidade: 0

                };

            }


            grupos[chave].quantidade++;

        }
    );


    // ==================================================
    // FUNDO
    // ==================================================

    let fundo =
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
        z-index:9999;
        padding:15px;
        box-sizing:border-box;
    `;


    // ==================================================
    // CAIXA
    // ==================================================

    let caixa =
        document.createElement("div");


    caixa.style.cssText = `
        background:#fff8e7;
        width:100%;
        max-width:450px;
        max-height:85vh;
        overflow:auto;
        border-radius:22px;
        padding:22px;
        box-sizing:border-box;
        border:4px solid #ffb300;
        box-shadow:0 10px 30px rgba(0,0,0,0.35);
    `;


    // ==================================================
    // TÍTULO
    // ==================================================

    let titulo =
        document.createElement("h2");

    titulo.innerHTML =
        "Seu Carrinho";


    titulo.style.cssText = `
        margin-top:0;
        color:#c62828;
        text-align:center;
        font-size:27px;
    `;


    caixa.appendChild(
        titulo
    );


    // ==================================================
    // TOTAL
    // ==================================================

    let total = 0;


    Object.values(grupos).forEach(
        function(produto) {

            total +=
                produto.preco *
                produto.quantidade;


            let item =
                document.createElement("div");


            item.style.cssText = `
                background:white;
                border:2px solid #ffd166;
                border-radius:15px;
                padding:15px;
                margin-bottom:12px;
            `;


            item.innerHTML = `

                <strong style="
                    font-size:19px;
                ">
                    ${produto.nome}
                </strong>

                <br>

                <span>
                    R$
                    ${produto.preco.toFixed(2)}
                    cada
                </span>

                <br><br>

                <button
                    onclick="diminuirProduto(
                        '${produto.nome.replace(/'/g, "\\'")}',
                        ${produto.preco}
                    )"
                    style="
                        background:#ffb300;
                        border:none;
                        border-radius:10px;
                        padding:12px 17px;
                        font-size:20px;
                        font-weight:bold;
                    "
                >
                    −
                </button>

                <strong style="
                    margin:0 15px;
                    font-size:20px;
                ">
                    ${produto.quantidade}
                </strong>

                <button
                    onclick="aumentarProduto
