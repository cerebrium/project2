'use strict';
module.exports = (sequelize, DataTypes) => {
  const favourite = sequelize.define('favourite', {
    tweet: DataTypes.STRING
  }, {});
  favourite.associate = function(models) {
    // associations can be defined here
    models.favourite.hasMany(models.favarticle);
  };
  return favourite;
};