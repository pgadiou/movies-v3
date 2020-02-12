const express = require('express');
const { PermissionMiddlewareCreator, RecordsGetter } = require('forest-express-sequelize');
const { movies, roles } = require('../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;

const router = express.Router();
const permissionMiddlewareCreator = new PermissionMiddlewareCreator('movies');

function setSearch(request) {
  return request.query.search ? request.query.search : null;
}

function setLimit(request) {
  return request.query.page ? parseInt(request.query.page.size) : 15;
}

function setOffset(request, limit) {
  return request.query.page ? (parseInt(request.query.page.number) - 1) * limit : 0;
}

function applySearchToRoles(search, limit, offset) {
  return movies
    .findAll({
      include: [{
        model: roles,
        as: 'roles',
        attributes: ['name','leadRole'],
        // required: false,
        where: {
          [Op.or]: [
            {
              [Op.and]: [
                {
                  leadRole: true,
                },
                {
                  name: { [Op.like]: `%${search}%` },
                },
              ],
            },
            {
              '$movies.title$': { [Op.like]: `%${search}%` },
            },
          ],
        },
      }],
      offset,
      limit,
    });
}

async function extendSearchToRole(request, search, response) {
  const limit = setLimit(request);
  const offset = setOffset(request, limit);
  const recordsGetter = new RecordsGetter(movies);
  const moviesFound = await applySearchToRoles(search, limit, offset);
  const moviesSerialized = await recordsGetter.serialize(moviesFound);
  response.send(moviesSerialized);
}

// This file contains the logic of every route in Forest Admin for the collection movies:
// - Native routes are already generated but can be extended/overriden - Learn how to extend a route here: https://docs.forestadmin.com/documentation/v/v5/reference-guide/routes/extend-a-route
// - Smart action routes will need to be added as you create new Smart Actions - Learn how to create a Smart Action here: https://docs.forestadmin.com/documentation/v/v5/reference-guide/actions/create-and-manage-smart-actions

// Create a Movie
router.post('/movies', permissionMiddlewareCreator.create(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v5/reference-guide/routes/default-routes#create-a-record
  next();
});

// Update a Movie
router.put('/movies/:recordId', permissionMiddlewareCreator.update(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v5/reference-guide/routes/default-routes#update-a-record
  next();
});

// Delete a Movie
router.delete('/movies/:recordId', permissionMiddlewareCreator.delete(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v5/reference-guide/routes/default-routes#delete-a-record
  next();
});

// Get a list of Movies
router.get('/movies', permissionMiddlewareCreator.list(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v5/reference-guide/routes/default-routes#get-a-list-of-records
  // const search = setSearch(request);
  // if (search) {
  //   extendSearchToRole(request, search, response);
  // } else {
  //   next();
  // }
  next();
});

// Get a number of Movies
router.get('/movies/count', permissionMiddlewareCreator.list(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v5/reference-guide/routes/default-routes#get-a-number-of-records
  // const search = setSearch(request);
  // if (search) {
  //   extendSearchToRole(request, search, response);
  // } else {
  //   next();
  // }
  next();
});

// Get a Movie
router.get('/movies/:recordId', permissionMiddlewareCreator.details(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v5/reference-guide/routes/default-routes#get-a-record
  next();
});

// Export a list of Movies
router.get('/movies.csv', permissionMiddlewareCreator.export(), (request, response, next) => {
  console.log("wtf");
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v5/reference-guide/routes/default-routes#export-a-list-of-records
  next();
});

router.post('/actions/send-info', (request, response) => {
  console.log("toto");
  const movieId = request.body.data.attributes.ids[0];

  response.send({
    webhook: { // This is the object that will be used to fire http calls.
      url: 'http://webhook.site/15c57d49-c679-4797-9ea8-b2c670849579', // The url of the company providing the service.
      method: 'POST', // The method you would like to use (typically a POST).
      // headers: { name: 'choco smacks' }, // You can add some headers if needed (you can remove it).
      // body: { // A body to send to the url (only JSON supported).
      //   adminToken: 'your-admin-token',
      // },
    },
    success: `Sent data of ${movieId}`, // The success message that will be toasted.
    // redirectTo: 'https://my-app-url/', // Force the redirection to your app if needed.
  });
});

module.exports = router;
