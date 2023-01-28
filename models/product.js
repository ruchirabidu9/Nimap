'use strict';
const {
  Model
} = require('sequelize');
const category = require('./category');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Category}) {
      // define association here
      this.belongsTo(Category, { foreignKey: 'categoryId'});
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'products',
    modelName: 'Product',
  });
  return Product;
};