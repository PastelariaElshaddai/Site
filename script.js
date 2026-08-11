// ======================================================
// PASTELARIA EL SHADDAI - SCRIPT.JS
// ======================================================

let carrinho =
    JSON.parse(localStorage.getItem("carrinho")) || [];


// ======================================================
// CONTADOR
// ======================================================

function atualizarContador() {

    const contador =
        document.getElementById("contador");

    if (contador) {
        contador.innerHTML = carrinho.length;
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

    // Remove uma janela anterior, se existir
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
        width:100%;
        max-width:450px;
        max-height:90vh;
        overflow-y:auto;
        background:#fff8e7;
        border:4px solid #ffb300;
        border-radius:22px;
        padding:20px;
        box-sizing:border-box;
        box-shadow:0 10px 35px rgba(0,0,0,0.35);
    `;


    // ==================================================
    // TÍTULO
    // ==================================================

    const titulo =
        document.createElement("h2");

    titulo.innerHTML =
        "Personalize seu pedido";

    titulo.style.cssText = `
        text-align:center;
        color:#c62828;
        margin-top:0;
        margin-bottom:18px;
    `;

    caixa.appendChild(titulo);


    // ==================================================
    // PRODUTO
    // ==================================================

    const produto =
        document.createElement("div");

    produto.style.cssText = `
        background:white;
        border-radius:12px;
        padding:15px;
        margin-bottom:20px;
        border:1px solid #ffd166;
    `;

    produto.innerHTML = `
        <strong style="font-size:20px;">
            ${nome}
        </strong>

        <div style="
            color:#c62828;
            font-size:20px;
            font-weight:bold;
            margin-top:5px;
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

        const tituloIngredientes =
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

                const linha =
                    document.createElement("label");

                linha.style.cssText = `
                    display:flex;
                    align-items:center;
                    justify-content:space-between;
                    background:white;
                    padding:13px;
                    margin:8px 0;
                    border-radius:10px;
                    border:1px solid #ddd;
                    font-size:17px;
                    cursor:pointer;
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

        const tituloAdicionais =
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

                const linha =
                    document.createElement("label");

                linha.style.cssText = `
                    display:flex;
                    align-items:center;
                    justify-content:space-between;
                    background:white;
                    padding:13px;
                    margin:8px 0;
                    border-radius:10px;
                    border:1px solid #ddd;
                    font-size:17px;
                    cursor:pointer;
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

    const areaTotal =
        document.createElement("div");

    areaTotal.style.cssText = `
        background:white;
        border:2px solid #ffd166;
        border-radius:12px;
        padding:15px;
        margin-top:20px;
        text-align:center;
    `;

    caixa.appendChild(areaTotal);


    function calcularTotal() {

        let total =
            Number(preco);


        const marcados =
            caixa.querySelectorAll(
                ".adicional-checkbox:checked"
            );


        marcados.forEach(
            function(campo) {

                const index =
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
                Total: R$ ${total.toFixed(2)}
            </strong>
        `;


        return total;
    }


    calcularTotal();


    // Atualiza o total quando marcar adicional
    caixa.addEventListener(
        "change",
        function(event) {

            if (
                event.target.classList.contains(
                    "adicional-checkbox"
                )
            ) {

                calcularTotal();
            }
        }
    );


    // ==================================================
    // BOTÃO ADICIONAR
    // ==================================================

    const botaoAdicionar =
        document.createElement("button");

    botaoAdicionar.innerHTML =
        "Adicionar ao carrinho";


    botaoAdicionar.style.cssText = `
        width:100%;
        padding:16px;
        margin-top:20px;
        border:0;
        border-radius:12px;
        background:#ffb300;
        color:#222;
        font-size:18px;
        font-weight:bold;
        cursor:pointer;
    `;


    botaoAdicionar.onclick =
        function() {

            const escolhidos = [];


            const marcados =
                caixa.querySelectorAll(
                    ".adicional-checkbox:checked"
                );


            marcados.forEach(
                function(campo) {

                    const index =
                        Number(
                            campo.dataset.index
                        );

                    escolhidos.push(
                        adicionais[index]
                    );
                }
            );


            // Ingredientes mantidos
            const ingredientesEscolhidos = [];


            const ingredientesMarcados =
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


            // Preço final
            let precoFinal =
                Number(preco);


            escolhidos.forEach(
                function(adicional) {

                    precoFinal +=
                        Number(
                            adicional.preco
                        );
                }
            );


            // Nome final
            let nomeFinal =
                nome;


            if (
                escolhidos.length > 0
            ) {

                nomeFinal +=
                    " + " +
                    escolhidos
                        .map(
                            function(adicional) {
                                return adicional.nome;
                            }
                        )
                        .join(", ");
            }


            // Adiciona ao carrinho
            carrinho.push({

                nome: nomeFinal,

                preco: precoFinal,

                ingredientes:
                    ingredientesEscolhidos,

                adicionais:
                    escolhidos.map(
                        function(adicional) {
                            return adicional.nome;
                        }
                    )
            });


            salvarCarrinho();


            // Fecha a janela
            fundo.remove();
        };


    caixa.appendChild(
        botaoAdicionar
    );


    // ==================================================
    // CANCELAR
    // ==================================================

    const botaoCancelar =
        document.createElement("button");

    botaoCancelar.innerHTML =
        "Cancelar";


    botaoCancelar.style.cssText = `
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

    fundo.appendChild(caixa);

    document.body.appendChild(fundo);
}


// ======================================================
// CARRINHO
// ======================================================

function verCarrinho() {

    if (
        carrinho.length === 0
    ) {
        return;
    }


    const antigo =
        document.getElementById(
            "fundoCarrinho"
        );

    if (antigo) {
        antigo.remove();
    }


    // Agrupar produtos
    const grupos = {};


    carrinho.forEach(
        function(produto) {

            const chave =
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

                    quantidade:0
                };
            }


            grupos[chave].quantidade++;
        }
    );


    // Fundo
    const fundo =
        document.createElement("div");

    fundo.id =
        "fundoCarrinho";


    fundo.style.cssText = `
        position:fixed;
        inset:0;
        background:rgba(0,0,0,0.65);
        display:flex;
        justify-content:center;
        align-items:center;
        z-index:9999;
        padding:15px;
        box-sizing:border-box;
    `;


    // Caixa
    const caixa =
        document.createElement("div");


    caixa.style.cssText = `
        background:#fff8e7;
        width:100%;
        max-width:450px;
        max-height:85vh;
        overflow:auto;
        border:4px solid #ffb300;
        border-radius:22px;
        padding:20px;
        box-sizing:border-box;
    `;


    const titulo =
        document.createElement("h2");

    titulo.innerHTML =
        "Seu Carrinho";

    titulo.style.cssText = `
        color:#c62828;
        text-align:center;
        margin-top:0;
    `;

    caixa.appendChild(titulo);


    let total = 0;


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
                border-radius:14px;
                padding:15px;
                margin-bottom:12px;
            `;


            item.innerHTML = `

                <strong style="
                    font-size:18px;
                ">
                    ${produto.nome}
                </strong>

                <br>

                R$ ${produto.preco.toFixed(2)}
                cada

                <br><br>

                <button
                    class="btnMenos"
                    style="
                        padding:10px 16px;
                        border:0;
                        border-radius:8px;
                        background:#ffb300;
                        font-size:20px;
                    "
                >
                    −
                </button>

                <strong style="
                    margin:0 15px;
                    font-size:19px;
                ">
                    ${produto.quantidade}
                </strong>

                <button
                    class="btnMais"
                    style="
                        padding:10px 16px;
                        border:0;
                        border-radius:8px;
                        background:#ffb300;
                        font-size:20px;
                    "
                >
                    +
                </button>

                <button
                    class="btnRemover"
                    style="
                        margin-left:8px;
                        padding:10px;
                        border:0;
                        border-radius:8px;
                        background:#c62828;
                        color:white;
                    "
                >
                    Remover
                </button>
            `;


            item.querySelector(
                ".btnMenos"
            ).onclick =
                function() {

                    diminuirProduto(
                        produto.nome,
                        produto.preco
                    );
                };


            item.querySelector(
                ".btnMais"
            ).onclick =
                function() {

                    aumentarProduto(
                        produto.nome,
                        produto.preco
                    );
                };


            item.querySelector(
                ".btnRemover"
            ).onclick =
                function() {

                    removerProduto(
                        produto.nome,
                        produto.preco
                    );
                };


            caixa.appendChild(item);
        }
    );


    // Total
    const totalTexto =
        document.createElement("h2");


    totalTexto.innerHTML =
        "💰 Total: R$ " +
        total.toFixed(2);


    totalTexto.style.cssText = `
        color:#c62828;
        text-align:center;
    `;


    caixa.appendChild(
        totalTexto
    );


    // Fazer pedido
    const finalizar =
        document.createElement("button");


    finalizar.innerHTML =
        "Fazer pedido";


    finalizar.style.cssText = `
        width:100%;
        padding:16px;
        margin-top:10px;
        border:0;
        border-radius:12px;
        background:#ffb300;
        font-size:18px;
        font-weight:bold;
        cursor:pointer;
    `;


    finalizar.onclick =
        function() {

            salvarCarrinho();

            window.location.href =
                "pedido.html";
        };


    caixa.appendChild(
        finalizar
    );


    // Fechar
    const fechar =
        document.createElement("button");


    fechar.innerHTML =
        "Fechar";


    fechar.style.cssText = `
        width:100%;
        padding:14px;
        margin-top:10px;
        border:2px solid #c62828;
        border-radius:12px;
        background:white;
        color:#c62828;
        font-weight:bold;
    `;


    fechar.onclick =
        function() {

            fundo.remove();
        };


    caixa.appendChild(
        fechar
    );


    fundo.appendChild(caixa);

    document.body.appendChild(fundo);
}


// ======================================================
// AUMENTAR
// ======================================================

function aumentarProduto(
    nome,
    preco
) {

    carrinho.push({

        nome:nome,

        preco:Number(preco)
    });


    salvarCarrinho();


    const fundo =
        document.getElementById(
            "fundoCarrinho"
        );


    if (fundo) {
        fundo.remove();
    }


    verCarrinho();
}


// ======================================================
// DIMINUIR
// ========================================
