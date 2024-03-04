/*
Escreva comandos SQL para criar as tabelas acima com as respectivas 
chaves primárias, estrangeiras e índice único 
*/
CREATE TABLE Produtos (
    codigo INT NOT NULL,
    nome VARCHAR(50) UNIQUE NOT NULL,
    valor float(10) NOT NULL,
		PRIMARY KEY (codigo)
);

CREATE TABLE ProdutosDescontos (
    codigo INT NOT NULL,
    quantidade INT NOT NULL,
    valor float(10) NOT NULL,
		PRIMARY KEY (codigo, quantidade),
    FOREIGN KEY (codigo) REFERENCES produtos(codigo)
);