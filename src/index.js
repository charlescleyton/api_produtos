const express = require('express')
const Produto = require('../model/Produtos')
const ProdutoDesconto = require('../model/ProdutosDescontos');
require('dotenv').config();

const database = express()
database.use(express.json())
const port = 3000

database.get('/buscaProdutos', async (req, res) => {
    const produtos = await Produto.findAll();
    res.send(produtos);
})

database.get('/buscaProdutosDescontos', async (req, res) => {
    const produtos = await ProdutoDesconto.findAll();
    res.send(produtos);
})

database.post('/exercicio1', async (req, res) => {
    const valorProduto = await ValorTotalDaVenda(req.body.quantidade);
    res.send({valorProduto});
})

database.post('/exercicio2B', async (req, res) => {
    const produtos = await inserirProduto(req.body.codigo, req.body.nome, req.body.valor);
    res.send({produtos});
})

database.post('/exercicio2C', async (req, res) => {
    const produtoDesconto = await inserirProdutoDesconto(req.body.codigo, req.body.quantidade, req.body.valor);
    res.send(produtoDesconto);
})

database.post('/exercicio2D', async (req, res) => {
    await inserirDadosVendaDVD();
    res.send("Produto Inserido com sucesso");
})

database.post('/exercicio2E', async (req, res) => {
    const valorVenda = await calcularValorVenda(req.body.codigo, req.body.quantidadeVenda);
    res.send({valorVenda});
})

function ValorTotalDaVenda(quantidade) {
    const precoBase = 1.10;
    const limiteDescontoMedio = 10;
    const precoDescontoMedio = precoBase - 0.1;
    const limiteDescontoAlto = 20;
    const precoDescontoAlto = precoBase - 0.2;

    if (quantidade <= limiteDescontoMedio) {
        return quantidade * precoBase;
    } else if (quantidade <= limiteDescontoAlto) {
        return (limiteDescontoMedio * precoBase) + (quantidade - limiteDescontoMedio) * precoDescontoMedio;
    } else {
        return (limiteDescontoMedio * precoBase) +
               (limiteDescontoAlto - limiteDescontoMedio) * precoDescontoMedio +
               (quantidade - limiteDescontoAlto) * precoDescontoAlto;
    }
    
}

async function inserirProduto(codigo, nome, valor) {
    let verificaCodigo = codigo
    if (!verificaCodigo) {
        const caracteres = '0123456789';
        const tamanhoCodigo = 4;
        let codigoGerado = '';

        for (let i = 0; i < tamanhoCodigo; i++) {
            const geraCodigo = Math.floor(Math.random() * caracteres.length);
            codigoGerado += caracteres[geraCodigo];
        }
        verificaCodigo = parseInt(codigoGerado);
    }
    const produto = await Produto.create({
        codigo: verificaCodigo,
        nome: nome,
        valor: valor,
    });
    console.log("O codigo do Produto é: " + produto.codigo);
    return produto.codigo;
}

async function inserirProdutoDesconto(codigoProduto, quantidadeInicial, valorDesconto) {
    const produtoDesconto = await ProdutoDesconto.create({
        codigo: codigoProduto,
        quantidade: quantidadeInicial,
        valor: valorDesconto
    })
    return produtoDesconto;
}

async function inserirDadosVendaDVD() {
    const codigoProduto = 1
    const nomeProduto = "DVD";
    const valorBase = 1.10;
    const codigo = await inserirProduto(codigoProduto, nomeProduto, valorBase);

    const quantidadeDesconto1 = 11
    const valorDesconto1 = 1.00;
    await inserirProdutoDesconto(codigo, quantidadeDesconto1, valorDesconto1);

    const quantidadeDesconto2 = 21
    const valorDesconto2 = 0.90;
    await inserirProdutoDesconto(codigo, quantidadeDesconto2, valorDesconto2);
}


async function calcularValorVenda(codigoProduto, quantidadeVendida) {
    const descontos = await ProdutoDesconto.findAll({
        where: { codigo: codigoProduto }
    });

    let valorTotal = 0;
    let quantidade = quantidadeVendida;


    for (let i = descontos.length - 1; i >= 0; i--) {
        if (quantidade > descontos[i].quantidade) {
            valorTotal += (quantidade - descontos[i].quantidade) * descontos[i].valor;
            quantidade = descontos[i].quantidade;
        }
    }

    return valorTotal;
}


database.listen(port, () => {
    console.log(`Rodando na porta ${port}`)
})