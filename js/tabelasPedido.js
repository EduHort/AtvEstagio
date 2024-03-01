const url = 'https://sistemalift1.com/lift_ps/api';

// Função auxiliar para fazer requisições e tratar a resposta JSON
async function fetchJSON(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Erro ao carregar os dados');
    }
    return response.json();
}

// Função principal para obter as informações do cliente
async function getInfoCliente() {
    try {
        // Obtém o ID do pedido da URL
        const urlSearchParams = new URLSearchParams(window.location.search);
        const id_Pedido = urlSearchParams.get("id");

        const id_cliente = await getIdCliente(id_Pedido);

        // Faz requisições para obter os endereços
        const [pedido, cliente, itens] = await Promise.all([
            fetchJSON(`${url}/Pedidos/${id_Pedido}`),
            fetchJSON(`${url}/Clientes/${id_cliente}`),
            fetchJSON(`${url}/ItensPedido/${id_Pedido}`)
        ]);

        adicionarLinhaTabelaInf(cliente.nome, cliente.cpf, pedido.data, cliente.email);
        putIdPedido(id_Pedido);
        await processarItens(itens);
    } catch (error) {
        console.error(error);
    }
}

// Função assíncrona para processar os itens do pedido
async function processarItens(itens) {
    try {
        let valorTotalFinal = 0;
        for (const pedido of itens) {
            const produto = await fetchJSON(`${url}/Produtos/${pedido.produto}`);

            const valorTotalItem = pedido.quantidade * produto.valor;
            valorTotalFinal += valorTotalItem;

            adicionarLinhaTabelaItens(pedido.produto, produto.nome, pedido.quantidade, produto.valor, valorTotalItem);
        }
        adicionarValorFinal(valorTotalFinal);
    } catch (error) {
        console.error(error);
    }
}

// Função assíncrona para obter o ID do cliente associado ao pedido
async function getIdCliente(id_pedido) {
    try {
        const pedido = await fetchJSON(`${url}/Pedidos/${id_pedido}`);
        return pedido.cliente;
    } catch (error) {
        console.error(error);
    }
}

// Função para adicionar uma linha à tabela com informações do cliente
function adicionarLinhaTabelaInf(nome, cpf, data_pedido, email) {
    try {
        // Obtém a referência do corpo da tabela
        const tbody = document.getElementById('corpo-tabela-inf');
        const novaLinha = document.createElement('tr');
        // Define o conteúdo HTML da nova linha com as informações do cliente
        novaLinha.innerHTML = `<td>${nome}</td><td>${cpf}</td><td>${data_pedido}</td><td>${email}</td>`;
        tbody.appendChild(novaLinha);
    } catch (error) {
        console.error(error);
    }
}

// Função para adicionar uma linha à tabela com informações dos itens do pedido
function adicionarLinhaTabelaItens(codigo, nome, quantidade, valor, valorTotal) {
    try {
        // Obtém a referência do corpo da tabela de itens
        const tbody = document.getElementById('corpo-tabela-itens');
        const novaLinha = document.createElement('tr');

        novaLinha.innerHTML = `<td>${codigo}</td><td>${nome}</td><td>${quantidade}</td><td>${valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td><td>${valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>`;
        tbody.appendChild(novaLinha);
    } catch (error) {
        console.error(error);
    }
}

// Função para adicionar o valor total final na interface
function adicionarValorFinal(valor) {
    try {
        // Obtém a referência do elemento HTML onde o valor final será exibido e converte o valor para BRL
        const valorFinal = document.getElementById('valorFinal');
        valorFinal.textContent = 'Total: ' + valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    } catch (error) {
        console.error(error);
    }
}

// Função para colocar o número do pedido no cabeçalho da primeira tabela
function putIdPedido(id_pedido) {
    try {
        const local = document.getElementById('infPedido');
        if (local) {
            local.textContent = "Informações do Pedido N° " + id_pedido;
        }
    } catch (error) {
        console.error(error);
    }
}

getInfoCliente();