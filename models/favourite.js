'use strict';
module.exports = (sequelize, DataTypes) => {
  const favourite = sequelize.define('favourite', {
    tweet: DataTypes.TEXT
  }, {});
  favourite.associate = function(models) {
    // associations can be defined here
    models.favourite.hasMany(models.favarticletwo);
  };
  return favourite;
};