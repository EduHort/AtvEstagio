const url = 'https://sistemalift1.com/lift_ps/api';

// Função auxiliar para fazer requisições e tratar a resposta JSON
async function fetchJSON(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Erro ao carregar os dados');
    }
    return response.json();
}

// Função principal para obter os pedidos e atualizar a tabela
async function getPedidos() {
    try {
        const pedidos = await fetchJSON(`${url}/Pedidos`)

        for (const pedido of pedidos) {
            // Obtém o nome do cliente e o valor total do pedido de forma assíncrona
            const [nome_cliente, valor_pedido] = await Promise.all([
                getInfoById('Clientes', pedido.cliente, 'nome'),
                calcularValorPedido(pedido.id)
            ]);

            // Adiciona uma linha à tabela com os dados do pedido
            adicionarLinhaTabela(pedido.id, nome_cliente, pedido.data, valor_pedido);
        }
    } catch (error) {
        console.error(error);
    }
}

// Função auxiliar para obter um recurso (cliente, produto, etc.) pelo seu ID
async function getInfoById(info, id, resultado) {
    try {
        // Faz uma requisição para obter o recurso pelo seu ID
        const response = await fetchJSON(`${url}/${info}/${id}`);
        // Retorna o valor do campo específico desejado
        return response[resultado];
    } catch (error) {
        console.error(error);
    }
}

// Função para calcular o valor total de um pedido
async function calcularValorPedido(id_pedido) {
    try {
        const itens = await fetchJSON(`${url}/ItensPedido/${id_pedido}`);
        let valorTotal = 0;

        for (const item of itens) {
            // Obtém o valor do produto associado ao item
            const produto = await getInfoById('Produtos', item.produto, 'valor');
            valorTotal += item.quantidade * produto;
        }

        return valorTotal;
    } catch (error) {
        console.error(error);
    }
}

// Função para adicionar uma linha à tabela com os dados do pedido
function adicionarLinhaTabela(codigo_pedido, nome_cliente, data_pedido, valor_pedido) {
    try {
        // Obtém o corpo da tabela
        const tbody = document.getElementById('corpo-tabela-pedidos');
        const novaLinha = document.createElement('tr');

        // Cria a célula para o código do pedido e adiciona um link para visualizar o pedido
        const colunaCodigo = document.createElement('td');
        const link = document.createElement('a');
        link.href = `./pedido.html?id=${codigo_pedido}`;
        link.innerText = codigo_pedido;
        colunaCodigo.appendChild(link);
        novaLinha.appendChild(colunaCodigo);

        // Cria as células restantes
        const colunaNomeCliente = document.createElement('td');
        colunaNomeCliente.innerText = nome_cliente;
        novaLinha.appendChild(colunaNomeCliente);

        const colunaData = document.createElement('td');
        colunaData.innerText = data_pedido;
        novaLinha.appendChild(colunaData);

        const colunaValor = document.createElement('td');
        colunaValor.innerText = valor_pedido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        novaLinha.appendChild(colunaValor);

        // Adiciona a nova linha ao corpo da tabela
        tbody.appendChild(novaLinha);
    } catch (error) {
        console.error(error);
    }
}

getPedidos();