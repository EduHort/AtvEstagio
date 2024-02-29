const url = 'https://sistemalift1.com/lift_ps/api';

async function getInfoCliente(){
    try{
        const urlSearchParams = new URLSearchParams(window.location.search)
        const id_Pedido = urlSearchParams.get("id")

        const id_cliente = await getIdCliente(id_Pedido)

        var response = await fetch(url + '/Pedidos/' + id_Pedido);
        if (!response.ok) {
            throw new Error('Erro ao carregar os dados');
        }

        const pedido = await response.json();

        var response = await fetch(url + '/Clientes/' + id_cliente);
        if (!response.ok) {
            throw new Error('Erro ao carregar os dados');
        }

        const cliente = await response.json();

        adicionarLinhaTabelaInf(cliente.nome, cliente.cpf, pedido.data, cliente.email)
        putIdPedido(id_Pedido)
        await getItens(id_Pedido)
    } catch (error) {
        console.error(error);
    }
}

async function getItens(id_pedido){
    try {
        const response = await fetch(url + '/ItensPedido/' + id_pedido);
        if (!response.ok) {
            throw new Error('Erro ao carregar os dados');
        }

        const pedidos = await response.json();

        var valorTotalFinal = 0
        for (const pedido of pedidos) {
            const nomeProduto = await getNomeProd(pedido.produto)
            const valorProduto = await getValorProduto(pedido.produto)
            valorTotalFinal += pedido.quantidade * valorProduto
            adicionarLinhaTabelaItens(pedido.produto, nomeProduto, pedido.quantidade, valorProduto, pedido.quantidade * valorProduto)
        }

        adicionarValorFinal(valorTotalFinal)

    } catch (error) {
        console.error(error);
    }
}

async function getNomeProd(id_produto){
    try {
        const response = await fetch(url + '/Produtos/' + id_produto);
        if (!response.ok) {
            throw new Error('Erro ao carregar os dados');
        }

        const produto = await response.json();
        return produto.nome;
    } catch (error) {
        console.error(error);
    }
}

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

async function getIdCliente(id_pedido){
    try {
        const response = await fetch(url + '/Pedidos/' + id_pedido);
        if (!response.ok) {
            throw new Error('Erro ao carregar os dados');
        }

        const pedido = await response.json();
        return pedido.cliente;
    } catch (error) {
        console.error(error);
    }
}

function adicionarLinhaTabelaInf(nome, cpf, data_pedido, email) {
    try {
        var tbody = document.getElementById('corpo-tabela-inf');
        var novaLinha = document.createElement('tr');
        novaLinha.innerHTML = '<td></td><td></td><td></td><td></td>';
        tbody.appendChild(novaLinha);
        var ultimaLinha = tbody.lastElementChild;
        ultimaLinha.children[0].innerText = nome;
        ultimaLinha.children[1].innerText = cpf;
        ultimaLinha.children[2].innerText = data_pedido;
        ultimaLinha.children[3].innerText = email;
    } catch (error) {
        console.error(error);
    }
}

function adicionarLinhaTabelaItens(codigo, nome, quantidade, valor, valorTotal) {
    try {
        var tbody = document.getElementById('corpo-tabela-itens');
        var novaLinha = document.createElement('tr');
        novaLinha.innerHTML = '<td></td><td></td><td></td><td></td><td></td>';
        tbody.appendChild(novaLinha);
        var ultimaLinha = tbody.lastElementChild;
        ultimaLinha.children[0].innerText = codigo;
        ultimaLinha.children[1].innerText = nome;
        ultimaLinha.children[2].innerText = quantidade;
        ultimaLinha.children[3].innerText = 'RS: ' + valor.toFixed(2);
        ultimaLinha.children[4].innerText = 'RS: ' + valorTotal.toFixed(2);
    } catch (error) {
        console.error(error);
    }
}

function adicionarValorFinal(valor){
    try{
        var novaDiv = document.createElement('div');
        novaDiv.className = 'valor_total'
        novaDiv.innerText = 'Total: R$ ' + valor.toFixed(2);
        document.body.appendChild(novaDiv)

    } catch (error) {
        console.error(error);
    }
}

function putIdPedido(id_pedido){
    try{
        var caption = document.getElementById('infPedido')

        if(caption){
            caption.textContent = "Informações do pedido " + id_pedido
        }

    } catch (error) {
        console.error(error);
    }
}

getInfoCliente()