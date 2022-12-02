const bcrypt = require("bcryptjs");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Role, {
        through: models.UserRole,
        as: "UserRoles",
        foreignKey: "userId",
        sourceKey: "id",
      });

      User.hasMany(models.Order, {
        as: "UserOrder",
        foreignKey: "userId",
        sourceKey: "id",
      });

      User.hasMany(models.Pickup, {
        as: "UserPickup",
        foreignKey: "userId",
        sourceKey: "id",
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: (u) => {
          const salt = bcrypt.genSaltSync(8);
          u.password = bcrypt.hashSync(u.password, salt);
        },
      },
    }
  );
  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
  return User;
};
