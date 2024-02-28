const url = 'https://sistemalift1.com/lift_ps/api';

// Função assíncrona para obter os pedidos e atualizar a tabela
async function getPedidos() {
    try {
        const response = await fetch(url + '/Pedidos');
        if (!response.ok) {
            throw new Error('Erro ao carregar os dados');
        }

        const pedidos = await response.json();

        for (const pedido of pedidos) {
            const nome_cliente = await getNomeCliente(pedido.cliente);
            const valor_pedido = await getPreco(pedido.id);

            adicionarLinhaTabela(pedido.id, nome_cliente, pedido.data, valor_pedido);
        }
    } catch (error) {
        console.error(error);
    }
}

// Função assíncrona para obter o nome do cliente pelo ID
async function getNomeCliente(id_cliente) {
    try {
        const response = await fetch(url + '/Clientes/' + id_cliente);
        if (!response.ok) {
            throw new Error('Erro ao carregar os dados');
        }

        const cliente = await response.json();
        return cliente.nome;
    } catch (error) {
        console.error(error);
    }
}

// Função assíncrona para obter o preço total do pedido pelo ID
async function getPreco(id_pedido) {
    try {
        const response = await fetch(url + '/ItensPedido/' + id_pedido);
        if (!response.ok) {
            throw new Error('Erro ao carregar os dados');
        }

        const pedidos = await response.json();

        let valorTotal = 0;
        for (const pedido of pedidos) {
            const valorProduto = await getValorProduto(pedido.produto);
            valorTotal += pedido.quantidade * valorProduto;
        }

        return valorTotal;
    } catch (error) {
        console.error(error);
    }
}

// Função assíncrona para obter o valor do produto pelo ID
async function getValorProduto(id_produto) {
    try {
        const response = await fetch(url + '/Produtos/' + id_produto);
        if (!response.ok) {
            throw new Error('Erro ao carregar os dados');
        }

        const produto = await response.json();
        return produto.valor;
    } catch (error) {
        console.error(error);
    }
}

// Função para adicionar uma linha na tabela com os dados do pedido
function adicionarLinhaTabela(codigo_pedido, nome_cliente, data_pedido, valor_pedido) {
    try {
        // Obter a referência da tabela
        var tbody = document.getElementById('corpo-tabela');

        // Criar uma nova linha na tabela
        var novaLinha = document.createElement('tr');
        novaLinha.innerHTML = '<td></td><td></td><td></td><td></td>';
        tbody.appendChild(novaLinha);

        // Preencher os dados na nova linha da tabela
        var ultimaLinha = tbody.lastElementChild;
        ultimaLinha.children[0].innerText = codigo_pedido;
        ultimaLinha.children[1].innerText = nome_cliente;
        ultimaLinha.children[2].innerText = data_pedido;
        ultimaLinha.children[3].innerText = valor_pedido;
    } catch (error) {
        console.error(error);
    }
}

getPedidos()