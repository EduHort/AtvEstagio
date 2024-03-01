const url = 'https://sistemalift1.com/lift_ps/api';

async function getClientes() {
    try {
        const response = await fetch(url + '/Clientes');
        if (!response.ok) {
            throw new Error('Erro ao carregar os dados');
        }

        const clientes = await response.json();

        for (const cliente of clientes) {
            adicionarLinhaTabelaClientes(cliente.id, cliente.nome, cliente.cpf, cliente.email);
        }
    } catch (error) {
        console.error(error);
    }
}

async function getProdutos() {
    try {
        const response = await fetch(url + '/Produtos');
        if (!response.ok) {
            throw new Error('Erro ao carregar os dados');
        }

        const produtos = await response.json();

        for (const produto of produtos) {
            adicionarLinhaTabelaProdutos(produto.id, produto.nome, produto.valor);
        }
    } catch (error) {
        console.error(error);
    }
}

function adicionarLinhaTabelaClientes(id, nome, cpf, email) {
    try {
        var tbody = document.getElementById('corpo-tabela-clientes');
        var novaLinha = document.createElement('tr');
        novaLinha.innerHTML = '<td></td><td></td><td></td><td></td>';
        tbody.appendChild(novaLinha);
        var ultimaLinha = tbody.lastElementChild;
        ultimaLinha.children[0].innerText = id;
        ultimaLinha.children[1].innerText = nome;
        ultimaLinha.children[2].innerText = cpf;
        ultimaLinha.children[3].innerText = email;
    } catch (error) {
        console.error(error);
    }
}

function adicionarLinhaTabelaProdutos(id, nome, valor) {
    try {
        var tbody = document.getElementById('corpo-tabela-produtos');
        var novaLinha = document.createElement('tr');
        novaLinha.innerHTML = '<td></td><td></td><td></td>';
        tbody.appendChild(novaLinha);
        var ultimaLinha = tbody.lastElementChild;
        ultimaLinha.children[0].innerText = id;
        ultimaLinha.children[1].innerText = nome;
        ultimaLinha.children[2].innerText = valor;
    } catch (error) {
        console.error(error);
    }
}

getClientes();
getProdutos();