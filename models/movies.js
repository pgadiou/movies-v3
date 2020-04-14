module.exports = (sequelize, DataTypes) => {
  const { Sequelize } = sequelize;

  const Movies = sequelize.define('movies', {
    title: {
      type: DataTypes.STRING,
    },
    releaseYear: {
      type: DataTypes.INTEGER,
    },
    rating: {
      type: DataTypes.INTEGER,
    },
    picture: {
      type: DataTypes.STRING,
    },
    academyAward: {
      type: DataTypes.BOOLEAN,
    },
  }, {
    tableName: 'movies',
    underscored: true,
    timestamps: false,
    schema: process.env.DATABASE_SCHEMA,
  });

  Movies.associate = (models) => {
    Movies.hasOne(models.movieCharacteristics, {
      foreignKey: {
        name: 'movieIdKey',
        field: 'movie_id',
      },
      as: 'movieCharacteristic',
    });
    Movies.hasMany(models.roles, {
      foreignKey: {
        name: 'movieIdKey',
        field: 'movie_id',
      },
      as: 'roles',
    });
    Movies.belongsTo(models.directors, {
      foreignKey: {
        name: 'directorIdKey',
        field: 'director_id',
      },
      as: 'filmmaker',
    });
  };

  return Movies;
};
