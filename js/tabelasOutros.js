const url = 'https://sistemalift1.com/lift_ps/api';

// Função genérica para buscar dados
async function fetchData(recurso) {
    try {
        const response = await fetch(`${url}/${recurso}`);
        if (!response.ok) {
            throw new Error('Erro ao carregar os dados');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

// Função para buscar e adicionar clientes à tabela
async function getClientes() {
    const clientes = await fetchData('Clientes');
    clientes.forEach(cliente => adicionarLinhaTabelaClientes(cliente));
}

// Função para buscar e adicionar produtos à tabela
async function getProdutos() {
    const produtos = await fetchData('Produtos');
    produtos.forEach(produto => adicionarLinhaTabelaProdutos(produto));
}

// Função para adicionar uma linha à tabela de clientes
function adicionarLinhaTabelaClientes({ id, nome, cpf, email }) {
    try {
        const tbody = document.getElementById('corpo-tabela-clientes');
        const novaLinha = document.createElement('tr');
        novaLinha.innerHTML = `<td>${id}</td><td>${nome}</td><td>${cpf}</td><td>${email}</td>`;
        tbody.appendChild(novaLinha);
    } catch (error) {
        console.error(error);
    }
}

// Função para adicionar uma linha à tabela de produtos
function adicionarLinhaTabelaProdutos({ id, nome, valor }) {
    try {
        const tbody = document.getElementById('corpo-tabela-produtos');
        const novaLinha = document.createElement('tr');
        novaLinha.innerHTML = `<td>${id}</td><td>${nome}</td><td>${valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>`;
        tbody.appendChild(novaLinha);
    } catch (error) {
        console.error(error);
    }
}

getClientes();
getProdutos();