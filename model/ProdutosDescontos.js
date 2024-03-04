const Sequelize = require('sequelize');
const db = require('../config/db');
const Produtos = require('./Produtos');

const ProdutosDescontos = db.define('produtosdescontos', {
  codigo: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    references: {
      model: Produtos,
      key: 'codigo',
    },
  },
  quantidade: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  valor: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
}, {
  Sequelize,
  timestamps: false, 
});

Produtos.hasMany(ProdutosDescontos, { foreignKey: 'codigo' });
ProdutosDescontos.belongsTo(Produtos, { foreignKey: 'codigo' });

module.exports = ProdutosDescontos;
