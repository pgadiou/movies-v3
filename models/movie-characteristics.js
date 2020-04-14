module.exports = (sequelize, DataTypes) => {
  const { Sequelize } = sequelize;
  const MovieCharacteristics = sequelize.define('movieCharacteristics', {
    language: {
      type: DataTypes.BOOLEAN,
    },
    graphicViolence: {
      type: DataTypes.BOOLEAN,
    },
    nudity: {
      type: DataTypes.BOOLEAN,
    },
    drugs: {
      type: DataTypes.BOOLEAN,
    },
    gore: {
      type: DataTypes.BOOLEAN,
    },
  }, {
    tableName: 'movie_characteristics',
    underscored: true,
    timestamps: false,
    schema: process.env.DATABASE_SCHEMA,
  });

  MovieCharacteristics.associate = (models) => {
    MovieCharacteristics.belongsTo(models.movies, {
      foreignKey: {
        name: 'movieIdKey',
        field: 'movie_id',
      },
      as: 'movie',
    });
  };

  return MovieCharacteristics;
};
