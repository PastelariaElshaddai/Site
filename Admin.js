let produtoEditandoId = null;
let fotoSelecionada = null;
let produtosCache = [];

document.addEventListener("DOMContentLoaded", () => {
    configurarFoto();
    carregarProdutos();
});

function configurarFoto() {
    const campoFoto =
        document.getElementById("fotoProduto");

    if (!campoFoto) return;

    campoFoto.addEventListener(
        "change",
        async (evento) => {

            const arquivo =
                evento.target.files[0];

            fotoSelecionada =
                arquivo
                    ? await arquivoParaBase64(arquivo)
                    : null;

        }
    );
}

function arquivoParaBase64(arquivo) {

    return new Promise(
        (resolve, reject) => {

            const leitor =
                new FileReader();

            leitor.onload =
                () => resolve(leitor.result);

            leitor.onerror = reject;

            leitor.readAsDataURL(arquivo);

        }
    );
}
function mostrarFormulario() {

    produtoEditandoId = null;

    document.getElementById(
        "formularioProduto"
    ).style.display = "block";

    document.getElementById(
        "tituloFormulario"
    ).innerText = "Novo produto";

    limparFormularioProduto();
}


function cancelarProduto() {

    document.getElementById(
        "formularioProduto"
    ).style.display = "none";

    produtoEditandoId = null;

    limparFormularioProduto();
}


function limparFormularioProduto() {

    const campos = [
        "nomeProduto",
        "precoProduto",
        "descricaoProduto",
        "fotoProduto",
        "produtoId"
    ];

    campos.forEach((id) => {

        const campo =
            document.getElementById(id);

        if (campo) {
            campo.value = "";
        }

    });

    const categoria =
        document.getElementById(
            "categoriaProduto"
        );

    if (categoria) {
        categoria.selectedIndex = 0;
    }

    const ativo =
        document.getElementById(
            "produtoAtivo"
        );

    if (ativo) {
        ativo.checked = true;
    }

    document
        .querySelectorAll(".adicional")
        .forEach((item) => {

            item.checked = false;

        });

    fotoSelecionada = null;
      }
function pegarAdicionaisSelecionados() {

    const adicionais = [];

    document
        .querySelectorAll(
            ".adicional:checked"
        )
        .forEach((item) => {

            adicionais.push({

                nome: item.value,

                preco: Number(
                    item.dataset.preco || 0
                )

            });

        });

    return adicionais;
}


async function salvarProduto() {

    const nome =
        document
            .getElementById(
                "nomeProduto"
            )
            .value
            .trim();


    const preco =
        document
            .getElementById(
                "precoProduto"
            )
            .value;


    if (!nome) {

        alert(
            "Digite o nome do produto."
        );

        return;

    }


    if (
        !preco ||
        Number(preco) <= 0
    ) {

        alert(
            "Digite um preço válido."
        );

        return;

    }


    if (
        typeof supabaseClient ===
        "undefined"
    ) {

        alert(
            "A conexão com o Supabase não foi carregada."
        );

        return;

    }


    const produto = {

        nome: nome,

        preco: Number(preco),

        categoria:
            document.getElementById(
                "categoriaProduto"
            ).value,

        descricao:
            document.getElementById(
                "descricaoProduto"
            ).value
            .trim(),

        ativo:
            document.getElementById(
                "produtoAtivo"
            ).checked,

        adicionais:
            pegarAdicionaisSelecionados()

    };


    if (fotoSelecionada) {

        produto.foto =
            fotoSelecionada;

    }


    let resultado;


    if (produtoEditandoId) {

        resultado =
            await supabaseClient
                .from("produtos")
                .update(produto)
                .eq(
                    "id",
                    produtoEditandoId
                );

    } else {

        resultado =
            await supabaseClient
                .from("produtos")
                .insert([produto]);

    }


    if (resultado.error) {

        console.error(
            resultado.error
        );

        alert(
            "Não foi possível salvar: " +
            resultado.error.message
        );

        return;

    }


    alert(
        produtoEditandoId
            ? "Produto atualizado com sucesso!"
            : "Produto adicionado com sucesso!"
    );


    cancelarProduto();

    carregarProdutos();

                  }
async function carregarProdutos() {

    const lista =
        document.getElementById(
            "listaProdutos"
        );

    if (
        !lista ||
        typeof supabaseClient ===
        "undefined"
    ) {
        return;
    }


    lista.innerHTML =
        "<p>Carregando produtos...</p>";


    const resultado =
        await supabaseClient
            .from("produtos")
            .select("*")
            .order(
                "id",
                {
                    ascending: false
                }
            );


    if (resultado.error) {

        console.error(
            resultado.error
        );

        lista.innerHTML =
            "<p>Não foi possível carregar os produtos.</p>";

        return;

    }


    produtosCache =
        resultado.data || [];


    if (
        produtosCache.length === 0
    ) {

        lista.innerHTML =
            "<p>Nenhum produto cadastrado ainda.</p>";

        return;

    }


    lista.innerHTML =
        produtosCache
            .map(
                criarCardProduto
            )
            .join("");

          }
function criarCardProduto(produto) {

    const preco =
        Number(
            produto.preco || 0
        ).toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL"
            }
        );


    const foto =
        produto.foto

            ? `
                <img
                    src="${produto.foto}"
                    alt="${produto.nome}"
                >
            `

            : `
                <div>
                    Sem foto
                </div>
            `;


    return `

        <article class="produto-admin">

            <div>
                ${foto}
            </div>


            <div>

                <h3>
                    ${produto.nome}
                </h3>


                <p>
                    ${produto.categoria || ""}
                </p>


                <p>
                    ${
                        produto.descricao ||
                        "Sem descrição."
                    }
                </p>


                <strong>
                    ${preco}
                </strong>


                <p>
                    ${
                        produto.ativo
                            ? "Ativo"
                            : "Inativo"
                    }
                </p>


                <button
                    onclick="editarProduto(
                        ${produto.id}
                    )"
                >
                    Editar
                </button>


                <button
                    onclick="alternarStatusProduto(
                        ${produto.id}
                    )"
                >
                    ${
                        produto.ativo
                            ? "Inativar"
                            : "Ativar"
                    }
                </button>


                <button
                    onclick="excluirProduto(
                        ${produto.id}
                    )"
                >
                    Excluir
                </button>

            </div>

        </article>

    `;
}
function editarProduto(id) {

    const produto =
        produtosCache.find(
            (item) =>
                item.id === id
        );

    if (!produto) return;


    produtoEditandoId = id;


    document.getElementById(
        "formularioProduto"
    ).style.display = "block";


    document.getElementById(
        "tituloFormulario"
    ).innerText =
        "Editar produto";


    document.getElementById(
        "produtoId"
    ).value =
        produto.id;


    document.getElementById(
        "nomeProduto"
    ).value =
        produto.nome || "";


    document.getElementById(
        "precoProduto"
    ).value =
        produto.preco || "";


    document.getElementById(
        "categoriaProduto"
    ).value =
        produto.categoria || "";


    document.getElementById(
        "descricaoProduto"
    ).value =
        produto.descricao || "";


    document.getElementById(
        "produtoAtivo"
    ).checked =
        produto.ativo !== false;


    fotoSelecionada =
        produto.foto || null;


    const adicionais =
        Array.isArray(
            produto.adicionais
        )

            ? produto.adicionais

            : [];


    document
        .querySelectorAll(
            ".adicional"
        )
        .forEach((campo) => {

            campo.checked =
                adicionais.some(
                    (adicional) =>
                        (
                            adicional.nome ||
                            adicional
                        ) ===
                        campo.value
                );

        });

}


async function alternarStatusProduto(id) {

    const produto =
        produtosCache.find(
            (item) =>
                item.id === id
        );

    if (!produto) return;


    const resultado =
        await supabaseClient
            .from("produtos")
            .update({

                ativo:
                    !produto.ativo

            })
            .eq("id", id);


    if (resultado.error) {

        alert(
            "Não foi possível alterar o status."
        );

        return;

    }


    carregarProdutos();

}


async function excluirProduto(id) {

    const produto =
        produtosCache.find(
            (item) =>
                item.id === id
        );

    if (!produto) return;


    const confirmar =
        confirm(
            `Deseja excluir "${produto.nome}"?`
        );


    if (!confirmar) return;


    const resultado =
        await supabaseClient
            .from("produtos")
            .delete()
            .eq("id", id);


    if (resultado.error) {

        alert(
            "Não foi possível excluir o produto."
        );

        return;

    }


    carregarProdutos();

}
