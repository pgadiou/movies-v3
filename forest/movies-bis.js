const { collection } = require('forest-express-sequelize');
const models = require('../models');

collection('moviesBis', {
  isSearchable: true,
  fields: [{
      field: 'title',
      type: 'String'
    }, {
      field: 'director',
      type: 'Number',
      reference: 'directors.id',
      //  get: function (director) {
      //   return {id: 1};
      // },
    }],
});
