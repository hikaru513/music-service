const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserLikedAlbum extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      this.belongsTo(models.Album, {
        foreignKey: 'albumId',
      });
    }
  }
  UserLikedAlbum.init({
    userId: DataTypes.INTEGER,
    albumId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'UserLikedAlbum',
  });
  return UserLikedAlbum;
};
