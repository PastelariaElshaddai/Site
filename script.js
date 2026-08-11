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
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    atualizarContador();
}


// ==========================================
// ADICIONAR PRODUTO
// ==========================================

function adicionarProduto(nome, preco) {

    carrinho.push({
        nome: nome,
        preco: Number(preco)
    });

    salvarCarrinho();
}


// ==========================================
// ABRIR CARRINHO
// ==========================================

function verCarrinho() {

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio.");
        return;
    }

    let grupos = {};

    carrinho.forEach(function(produto) {

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


    // FUNDO ESCURO
    let fundo = document.createElement("div");

    fundo.id = "fundoCarrinho";

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
        z-index:9999;
        padding:15px;
        box-sizing:border-box;
    `;


    // CAIXA DO CARRINHO
    let caixa = document.createElement("div");

    caixa.style.cssText = `
        background:linear-gradient(180deg,#fff8e8 0%,#fff1cf 100%);
        width:100%;
        max-width:450px;
        max-height:85vh;
        overflow:auto;
        border-radius:22px;
        padding:22px;
        box-sizing:border-box;
        border:3px solid #ffb800;
        box-shadow:0 10px 35px rgba(0,0,0,0.35);
        font-family:Arial,sans-serif;
    `;


    // TÍTULO
    let titulo = document.createElement("h2");

    titulo.innerHTML = "🛒 Seu Carrinho";

    titulo.style.cssText = `
        margin-top:0;
        color:#c62828;
        font-size:28px;
        text-align:center;
    `;

    caixa.appendChild(titulo);


    let total = 0;


    // PRODUTOS
    Object.values(grupos).forEach(function(produto) {

        total += produto.preco * produto.quantidade;

        let item = document.createElement("div");

        item.style.cssText = `
            background:#ffffff;
            border-radius:14px;
            padding:15px;
            margin-bottom:12px;
            border:2px solid #ffd166;
            box-shadow:0 3px 8px rgba(0,0,0,0.08);
        `;


        item.innerHTML = `

            <strong style="
                color:#333;
                font-size:19px;
            ">
                ${produto.nome}
            </strong>

            <br>

            <span style="
                color:#555;
                font-size:16px;
            ">
                R$ ${produto.preco.toFixed(2)} cada
            </span>

            <br><br>


            <button
                onclick="diminuirProduto('${produto.nome}', ${produto.preco})"
                style="
                    background:#ffb800;
                    border:0;
                    border-radius:8px;
                    padding:8px 14px;
                    font-size:20px;
                    font-weight:bold;
                    cursor:pointer;
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
                onclick="aumentarProduto('${produto.nome}', ${produto.preco})"
                style="
                    background:#ffb800;
                    border:0;
                    border-radius:8px;
                    padding:8px 14px;
                    font-size:20px;
                    font-weight:bold;
                    cursor:pointer;
                "
            >
                +
            </button>


            <button
                onclick="removerProduto('${produto.nome}', ${produto.preco})"
                style="
                    margin-left:10px;
                    background:#d62828;
                    color:white;
                    border:0;
                    border-radius:8px;
                    padding:9px 12px;
                    font-weight:bold;
                    cursor:pointer;
                "
            >
                Remover
            </button>
        `;


        caixa.appendChild(item);
    });


    // TOTAL
    let totalTexto = document.createElement("h2");

    totalTexto.innerHTML =
        "💰 Total: R$ " + total.toFixed(2);

    totalTexto.style.cssText = `
        color:#c62828;
        text-align:center;
        border-top:2px solid #ffcc66;
        padding-top:15px;
        margin-top:15px;
    `;

    caixa.appendChild(totalTexto);


    // FAZER PEDIDO
    let finalizar = document.createElement("button");

    finalizar.innerHTML = "📦 Fazer pedido";

    finalizar.style.cssText = `
        width:100%;
        padding:16px;
        margin-top:12px;
        font-size:18px;
        font-weight:bold;
        border:none;
        border-radius:12px;
        cursor:pointer;
        background:#ffb800;
        color:#222;
        box-shadow:0 3px 8px rgba(0,0,0,0.15);
    `;


    finalizar.onclick = function() {

        salvarCarrinho();

        window.location.href = "pedido.html";
    };


    caixa.appendChild(finalizar);


    // FECHAR
    let fechar = document.createElement("button");

    fechar.innerHTML = "Fechar";

    fechar.style.cssText = `
        width:100%;
        padding:15px;
        margin-top:10px;
        font-size:16px;
        border:2px solid #d62828;
        border-radius:12px;
        cursor:pointer;
        background:#fff;
        color:#c62828;
        font-weight:bold;
    `;


    fechar.onclick = function() {
        fundo.remove();
    };


    caixa.appendChild(fechar);

    fundo.appendChild(caixa);

    document.body.appendChild(fundo);
}


// ==========================================
// AUMENTAR QUANTIDADE
// ==========================================

function aumentarProduto(nome, preco) {

    carrinho.push({
        nome: nome,
        preco: Number(preco)
    });

    salvarCarrinho();

    let fundo = document.getElementById("fundoCarrinho");

    if (fundo) {
        fundo.remove();
    }

    verCarrinho();
}


// ==========================================
// DIMINUIR QUANTIDADE
// ==========================================

function diminuirProduto(nome, preco) {

    let indice = carrinho.findIndex(function(produto) {

        return (
            produto.nome === nome &&
            Number(produto.preco) === Number(preco)
        );
    });


    if (indice !== -1) {
        carrinho.splice(indice, 1);
    }


    salvarCarrinho();


    let fundo = document.getElementById("fundoCarrinho");

    if (fundo) {
        fundo.remove();
    }


    if (carrinho.length > 0) {
        verCarrinho();
    }
}


// ==========================================
// REMOVER PRODUTO
// ==========================================

function removerProduto(nome, preco) {

    carrinho = carrinho.filter(function(produto) {

        return !(
            produto.nome === nome &&
            Number(produto.preco) === Number(preco)
        );
    });


    salvarCarrinho();


    let fundo = document.getElementById("fundoCarrinho");

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
        alert("Adicione algum produto ao carrinho primeiro.");
        return;
    }

    salvarCarrinho();

    window.location.href = "pedido.html";
}


// ==========================================
// INICIAR CONTADOR
// ==========================================

document.addEventListener("DOMContentLoaded", function() {
    atualizarContador();
});
// ==========================================
// PERSONALIZAR PRODUTO
// ==========================================

function personalizarProduto(nome, preco, ingredientes, adicionais) {

    // Fechar personalização anterior, se existir
    let antigo = document.getElementById("modalPersonalizar");

    if (antigo) {
        antigo.remove();
    }

    let precoBase = Number(preco);

    // Fundo
    let fundo = document.createElement("div");

    fundo.id = "modalPersonalizar";

    fundo.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.65);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        padding: 15px;
        box-sizing: border-box;
    `;


    // Caixa
    let caixa = document.createElement("div");

    caixa.style.cssText = `
        width: 100%;
        max-width: 460px;
        max-height: 90vh;
        overflow-y: auto;
        background: #fff8e8;
        border: 3px solid #ffb800;
        border-radius: 22px;
        padding: 22px;
        box-sizing: border-box;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        font-family: Arial, sans-serif;
    `;


    // Título
    let titulo = document.createElement("h2");

    titulo.innerHTML = "Personalizar produto";

    titulo.style.cssText = `
        margin: 0 0 8px 0;
        color: #c62828;
        font-size: 27px;
        text-align: center;
    `;

    caixa.appendChild(titulo);


    // Nome do produto
    let nomeProduto = document.createElement("div");

    nomeProduto.innerHTML =
        "<strong>" + nome + "</strong>";

    nomeProduto.style.cssText = `
        font-size: 21px;
        text-align: center;
        margin-bottom: 5px;
        color: #222;
    `;

    caixa.appendChild(nomeProduto);


    // Preço base
    let precoBaseTexto = document.createElement("div");

    precoBaseTexto.innerHTML =
        "Preço: R$ " + precoBase.toFixed(2);

    precoBaseTexto.style.cssText = `
        text-align: center;
        color: #c62828;
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 22px;
    `;

    caixa.appendChild(precoBaseTexto);


    // ==========================================
    // INGREDIENTES
    // ==========================================

    if (ingredientes && ingredientes.length > 0) {

        let tituloIngredientes =
            document.createElement("h3");

        tituloIngredientes.innerHTML =
            "Ingredientes";

        tituloIngredientes.style.cssText = `
            margin: 10px 0;
            color: #222;
            font-size: 20px;
        `;

        caixa.appendChild(tituloIngredientes);


        let textoIngredientes =
            document.createElement("p");

        textoIngredientes.innerHTML =
            "Desmarque o que você não deseja:";

        textoIngredientes.style.cssText = `
            margin: 0 0 10px 0;
            color: #555;
        `;

        caixa.appendChild(textoIngredientes);


        ingredientes.forEach(function(ingrediente, indice) {

            let linha = document.createElement("label");

            linha.style.cssText = `
                display: flex;
                align-items: center;
                gap: 12px;
                background: white;
                border: 1px solid #ffd166;
                border-radius: 12px;
                padding: 13px;
                margin-bottom: 8px;
                font-size: 17px;
                cursor: pointer;
                box-sizing: border-box;
            `;


            let checkbox =
                document.createElement("input");

            checkbox.type = "checkbox";

            checkbox.checked = true;

            checkbox.dataset.ingrediente =
                ingrediente;

            checkbox.style.cssText = `
                width: 20px;
                height: 20px;
                accent-color: #ffb800;
            `;


            let texto =
                document.createElement("span");

            texto.innerHTML = ingrediente;


            linha.appendChild(checkbox);
            linha.appendChild(texto);

            caixa.appendChild(linha);

        });

    }


    // ==========================================
    // ADICIONAIS
    // ==========================================

    if (adicionais && adicionais.length > 0) {

        let tituloAdicionais =
            document.createElement("h3");

        tituloAdicionais.innerHTML =
            "Adicionais";

        tituloAdicionais.style.cssText = `
            margin: 22px 0 10px 0;
            color: #222;
            font-size: 20px;
        `;

        caixa.appendChild(tituloAdicionais);


        let textoAdicionais =
            document.createElement("p");

        textoAdicionais.innerHTML =
            "Escolha os adicionais que desejar:";

        textoAdicionais.style.cssText = `
            margin: 0 0 10px 0;
            color: #555;
        `;

        caixa.appendChild(textoAdicionais);


        adicionais.forEach(function(adicional, indice) {

            let linha = document.createElement("label");

            linha.style.cssText = `
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 10px;
                background: white;
                border: 1px solid #ffd166;
                border-radius: 12px;
                padding: 13px;
                margin-bottom: 8px;
                cursor: pointer;
                box-sizing: border-box;
            `;


            let esquerda =
                document.createElement("div");

            esquerda.style.cssText = `
                display: flex;
                align-items: center;
                gap: 12px;
                font-size: 17px;
            `;


            let checkbox =
                document.createElement("input");

            checkbox.type = "checkbox";

            checkbox.dataset.preco =
                Number(adicional.preco);

            checkbox.dataset.nome =
                adicional.nome;

            checkbox.style.cssText = `
                width: 20px;
                height: 20px;
                accent-color: #ffb800;
            `;


            let nomeAdicional =
                document.createElement("span");

            nomeAdicional.innerHTML =
                adicional.nome;


            let precoAdicional =
                document.createElement("strong");

            precoAdicional.innerHTML =
                "+ R$ " +
                Number(adicional.preco).toFixed(2);

            precoAdicional.style.cssText = `
                color: #c62828;
                white-space: nowrap;
                font-size: 16px;
            `;


            esquerda.appendChild(checkbox);
            esquerda.appendChild(nomeAdicional);

            linha.appendChild(esquerda);
            linha.appendChild(precoAdicional);

            caixa.appendChild(linha);

        });

    }


    // ==========================================
    // TOTAL
    // ==========================================

    let totalBox =
        document.createElement("div");

    totalBox.style.cssText = `
        margin-top: 20px;
        padding: 16px;
        background: #ffb800;
        border-radius: 14px;
        text-align: center;
        font-size: 23px;
        font-weight: bold;
        color: #222;
    `;

    totalBox.innerHTML =
        "Total: R$ " +
        precoBase.toFixed(2);

    caixa.appendChild(totalBox);


    // ==========================================
    // ATUALIZAR TOTAL
    // ==========================================

    function atualizarTotal() {

        let total = precoBase;

        let caixas =
            caixa.querySelectorAll(
                'input[type="checkbox"][data-preco]'
            );


        caixas.forEach(function(checkbox) {

            if (checkbox.checked) {

                total +=
                    Number(checkbox.dataset.preco);

            }

        });


        totalBox.innerHTML =
            "Total: R$ " +
            total.toFixed(2);

    }


    let todosCheckboxes =
        caixa.querySelectorAll(
            'input[type="checkbox"]'
        );


    todosCheckboxes.forEach(function(checkbox) {

        checkbox.addEventListener(
            "change",
            atualizarTotal
        );

    });


    // ==========================================
    // BOTÃO ADICIONAR
    // ==========================================

    let adicionar =
        document.createElement("button");

    adicionar.innerHTML =
        "Adicionar ao carrinho";

    adicionar.style.cssText = `
        width: 100%;
        padding: 16px;
        margin-top: 15px;
        border: none;
        border-radius: 12px;
        background: #ffb800;
        color: #222;
        font-size: 19px;
        font-weight: bold;
        cursor: pointer;
    `;


    adicionar.onclick = function() {

        let ingredientesEscolhidos = [];

        let ingredientesCheckboxes =
            caixa.querySelectorAll(
                'input[type="checkbox"][data-ingrediente]'
            );


        ingredientesCheckboxes.forEach(
            function(checkbox) {

                if (checkbox.checked) {

                    ingredientesEscolhidos.push(
                        checkbox.dataset.ingrediente
                    );

                }

            }
        );


        let adicionaisEscolhidos = [];

        let adicionaisCheckboxes =
            caixa.querySelectorAll(
                'input[type="checkbox"][data-preco]'
            );


        let precoFinal = precoBase;


        adicionaisCheckboxes.forEach(
            function(checkbox) {

                if (checkbox.checked) {

                    let adicional = {

                        nome:
                            checkbox.dataset.nome,

                        preco:
                            Number(checkbox.dataset.preco)

                    };


                    adicionaisEscolhidos.push(
                        adicional
                    );


                    precoFinal +=
                        adicional.preco;

                }

            }
        );


        // Nome que aparecerá no carrinho
        let nomeFinal = nome;


        if (adicionaisEscolhidos.length > 0) {

            nomeFinal +=
                " + " +
                adicionaisEscolhidos
                    .map(function(adicional) {
                        return adicional.nome;
                    })
                    .join(", ");

        }


        // Salvar no carrinho
        carrinho.push({

            nome: nomeFinal,

            preco: precoFinal,

            ingredientes:
                ingredientesEscolhidos,

            adicionais:
                adicionaisEscolhidos

        });


        salvarCarrinho();


        // Fechar janela
        fundo.remove();

    };


    caixa.appendChild(adicionar);


    // ==========================================
    // BOTÃO FECHAR
    // ==========================================

    let fechar =
        document.createElement("button");

    fechar.innerHTML =
        "Fechar";

    fechar.style.cssText = `
        width: 100%;
        padding: 14px;
        margin-top: 10px;
        border: 2px solid #c62828;
        border-radius: 12px;
        background: white;
        color: #c62828;
        font-size: 17px;
        font-weight: bold;
        cursor: pointer;
    `;


    fechar.onclick = function() {

        fundo.remove();

    };


    caixa.appendChild(fechar);


    // ==========================================
    // MOSTRAR JANELA
    // ==========================================

    fundo.appendChild(caixa);

    document.body.appendChild(fundo);

}
