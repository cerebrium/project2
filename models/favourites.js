'use strict';
module.exports = (sequelize, DataTypes) => {
  const favourites = sequelize.define('favourites', {
    tweet: DataTypes.STRING
  }, {});
  favourites.associate = function(models) {
    // associations can be defined here
  };
  return favourites;
};