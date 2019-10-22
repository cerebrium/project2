'use strict';
module.exports = (sequelize, DataTypes) => {
  const favarticle = sequelize.define('favarticle', {
    title: DataTypes.STRING
  }, {});
  favarticle.associate = function(models) {
    // associations can be defined here
    models.favarticle.belongsTo(models.favourite)
  };
  return favarticle;
};