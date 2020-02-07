const { collection } = require('forest-express-sequelize');
const sequelize = require('sequelize');

const {Op} = sequelize;
const models = require('../models');


// This file allows you to add to your Forest UI:
// - Smart actions: https://docs.forestadmin.com/documentation/reference-guide/actions/create-and-manage-smart-actions
// - Smart fields: https://docs.forestadmin.com/documentation/reference-guide/fields/create-and-manage-smart-fields
// - Smart relationships: https://docs.forestadmin.com/documentation/reference-guide/relationships/create-a-smart-relationship
// - Smart segments: https://docs.forestadmin.com/documentation/reference-guide/segments/smart-segments
collection('movies', {
  actions: [{
    name: 'send info',
  }],
  fields: [{
    field: 'smartfield',
    type: 'Number',
    isSearchable: true,
    get(movie) {
      // eslint-disable-next-line max-len
      return 12;
    },
    // search(query, search) {
    //   query.include.push({
    //     model: models.roles,
    //     as: 'roles',
    //     attributes: ['name', 'leadRole'],
    //     // required: false,

    //     // RESTRICT JOIN TO SPECIFIC RECORDS UPON CONDITION
    //     // where: {
    //     //   [Op.and]: [
    //     //     {
    //     //       lead_role: { [Op.eq]: true },
    //     //     },
    //     //     {
    //     //       name: { [Op.like]: `%${search}%` },
    //     //     },
    //     //   ],
    //     // },
    //   });
      
    //   // TRY USING SEQUELIZE LITERAL
    //   // const searchCondition = models.sequelize.literal(`roles.name ILIKE '%${search}%'`);

    //   // TRY BUILDING QUERY USING THE DOC SYNTAX
    //   const searchCondition = {
    //     [Op.and]: [
    //       // models.sequelize.literal(`roles.name ILIKE '%${search}%'`),
    //       { '$roles.lead_role$': { [Op.eq]: true } },
    //       { '$roles.name$': { [Op.like]: `%${search}%` } },
    //     ],
    //   };

    //   // TRY BUILDING QUERY WITH DIFFERENT SYNTAX
    //   // {
    //   //   // where: {
    //   //   //   $and: [
    //   //   //     {
    //   //   //       '$roles.leadRole$': {
    //   //   //         $eq: true,
    //   //   //       },
    //   //   //     },
    //   //   //     {
    //   //   //       '$roles.name$': {
    //   //   //         $like: `%${search}%`,
    //   //   //       },
    //   //   //     },
    //   //   //   ],
    //   //   // },


    //   // query.where.push(searchCondition);
      
    //   console.log(query.where);
    //   console.log(query.where[Op.and][0][Op.or]);

    //   return query;

    //   // TRYING TO RETURN DIRECTLY A PROMISE
    //   // return query = models.movies.findAll({
    //   //   where: {
    //   //     '$roles.name$': {[Op.like]: `%${search}%` },
    //   //   },
    //   //   include: [{
    //   //     model: models.roles,
    //   //     as: 'roles',
    //   //   }],
    //   // });
    // },
  }],
  segments: [],
});
// query => ce qu'on passe directement sequelize query

// {
//   where: {
//     [Symbol(and)]: [{ [Symbol(or)]: [
//       {id : 12},
//       Where {
//         attribute: Fn { fn: 'lower', args: [Col { col: 'movies.title' }] },
//         comparator: ' LIKE ',
//         logic: Fn { fn: 'lower', args: ['%12%'] }
//       },
//       Where {
//         attribute: Fn { fn: 'lower', args: [Col { col: 'movies.picture' }] },
//         comparator: ' LIKE ',
//         logic: Fn { fn: 'lower', args: ['%12%'] }
//       }
//     ]}]
//   },
//   include: [],
//   order: [ [ 'id', 'DESC' ] ],
//   offset: 0,
//   limit: 15
// }
