'use strict';
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 99],
          msg: 'name must be between 1 and 99 characters'
        }
      } 
    },
    email: { 
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Invalid email address'
        }
      } 
    },
    password: { 
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8, 99],
          msg: 'Password must be between 8 and 99 characters'
        }
      } 
    }
  }, {
    hooks: {
      beforeCreate: function(pendingUser, options, cb) {
        if (pendingUser && pendingUser.password) {
          let hash = bcrypt.hashSync(pendingUser.password, 12);
          pendingUser.password = hash;
        }
        // cb(null, pendingUser)
      }
    }
  });
  user.associate = function(models) {
    // associations can be defined here
  };

  // prototypal inheritence compares entered password to hashed password
  user.prototype.validPassword = function(passwordTyped) {
    return bcrypt.compareSync(passwordTyped, this.password);
  };

  // Removes the password before serializing
  user.prototype.toJSON = function() {
    let userData = this.get();
    delete userData.password;
    return userData
  }

  return user;
};