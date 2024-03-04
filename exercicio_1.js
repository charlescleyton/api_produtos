/*
Uma loja vende DVDs por R$ 1,10 a unidade. Acima de 10 unidades, será vendido cada DVD por
R$ 1,00 a unidade adicional e acima de 20 unidades, será vendido cada unidade adicional a R$ 0,90.
Exemplo: Vendendo 21 unidades deverá ser cobrado 10x1.10+10x1.00+1x0.90.
Escreva uma função (reutilizável) que receba a quantidade de DVDs a ser vendida e retorne o valor desta venda como parâmetro.
*/
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

console.log("Valor da venda DVDs: R$ " + ValorTotalDaVenda(7).toFixed(2));
