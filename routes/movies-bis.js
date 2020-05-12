const express = require('express');
const { PermissionMiddlewareCreator, RecordSerializer } = require('forest-express-sequelize');
const { collection } = require('forest-express-sequelize');
const sequelize = require('sequelize');
const models = require('../models');
// const JSONAPISerializer = require('jsonapi-serializer').Serializer

const router = express.Router();
const permissionMiddlewareCreator = new PermissionMiddlewareCreator('moviesBis');

const moviesSerializer = new RecordSerializer({ name: 'moviesBis' });

// const moviesSerializer = new JSONAPISerializer('movies_bis', {
//   attributes: ['title'],
//   // director: {
//   //   ref: 'id',
//   // }
// });

router.get('/moviesBis', permissionMiddlewareCreator.list(), async (request, response, next) => {
  const movies = await models.movies
    .findAll()
    .then((movies) => {
      console.log(movies)
      return movies.map((movie) => {
        movie.director = { id: 1 };
        return movie;
      });
    });
  // const directorId = await models.directors.findAll().then(directors => directors[0].id);
  // console.log("DIRECTOR ID =========>", directorId);
  // // console.log(movies);
  // console.log(movies[0]);
  moviesSerialized = await moviesSerializer.serialize(movies);
  response.send(moviesSerialized)
});

module.exports = router;
