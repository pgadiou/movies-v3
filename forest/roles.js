const { collection } = require('forest-express-sequelize');
const { actors } = require('../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;

// This file allows you to add to your Forest UI:
// - Smart actions: https://docs.forestadmin.com/documentation/reference-guide/actions/create-and-manage-smart-actions
// - Smart fields: https://docs.forestadmin.com/documentation/reference-guide/fields/create-and-manage-smart-fields
// - Smart relationships: https://docs.forestadmin.com/documentation/reference-guide/relationships/create-a-smart-relationship
// - Smart segments: https://docs.forestadmin.com/documentation/reference-guide/segments/smart-segments
collection('roles', {
  actions: [],
  fields: [
    {
      field: 'Has movie?',
      type: 'Boolean',
      get(role) {
        console.log(role)
        return role.movie ? true : false ;
      },
    },{
    field: 'actor name',
    type: 'String',
    get: (role) => {
      return actors
        .findOne({ where: { id: role.actorIdKey } })
        .then((actor) => actor ? `${actor.firstName} ${actor.lastName}` : null);
    },
    search(query, search) {
      // let searchSplit = search.split(' ');
      // console.log(query)
      // console.log(query.where[Op.and][0][Op.or][4].attribute, search);
      // const searchCondition = { smartfield: { [Op.like]: `%${search}%` } };
      // // query.where[Op.and][0][Op.or].push(searchCondition);
      console.log(query);
      return query;
    },
  }],
  segments: [],
});
