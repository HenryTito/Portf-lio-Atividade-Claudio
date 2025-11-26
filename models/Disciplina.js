const { DataTypes } = require("sequelize");
const sequelize = require("./database");

const Disciplina = sequelize.define("Disciplina", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: "disciplinas",   
  timestamps: false           
});

module.exports = Disciplina;
