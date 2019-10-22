'use strict';
module.exports = (sequelize, DataTypes) => {
  const favarticles = sequelize.define('favarticles', {
    title: DataTypes.STRING
  }, {});
  favarticles.associate = function(models) {
    // associations can be defined here
  };
  return favarticles;
};