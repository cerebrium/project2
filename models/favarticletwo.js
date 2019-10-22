'use strict';
module.exports = (sequelize, DataTypes) => {
  const favarticletwo = sequelize.define('favarticletwo', {
    title: DataTypes.STRING,
    favouriteId: DataTypes.INTEGER
  }, {});
  favarticletwo.associate = function(models) {
    // associations can be defined here
    models.favarticletwo.belongsTo(models.favourite);
  };
  return favarticletwo;
};