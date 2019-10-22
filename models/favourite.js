'use strict';
module.exports = (sequelize, DataTypes) => {
  const favourite = sequelize.define('favourite', {
    tweet: DataTypes.STRING
  }, {});
  favourite.associate = function(models) {
    // associations can be defined here
  };
  return favourite;
};