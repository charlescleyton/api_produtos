const Sequelize = require('sequelize');
const db = require('../config/db');


const Produtos = db.define('produtos', {
  codigo: {
    type: Sequelize.INTEGER(10),
    primaryKey: true,
    allowNull: false,
  },
  nome: {
    type: Sequelize.STRING(50),
    allowNull: false,
    unique: true,
  },
  valor: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
}, {
  Sequelize,
  timestamps: false, 
});

module.exports = Produtos;
