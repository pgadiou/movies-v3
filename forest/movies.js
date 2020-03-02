const { collection } = require('forest-express-sequelize');
const sequelize = require('sequelize');

const { Op } = sequelize;
// const models = require('../models');

collection('movies', {
  actions: [{
    name: 'send info',
  }],
  fields: [
    {
      field: 'Director name',
      type: 'String',
      get(movie) {
        return movie.filmmaker ? movie.filmmaker.lastName : 'n.a.';
      },
      search(query, search) {
        // Disable search on director for belongsTo select
        if (query.include.length > 0) {
          const searchCondition = { '$filmmaker.last_name$': { [Op.like]: `%${search}%` } };
          query.where[Op.and][0][Op.or].push(searchCondition);
        }
        return query;
      },
    },
    {
      field: 'Has roles?',
      type: 'Boolean',
      get(movie) {
        return movie
          .getRoles()
          .then((roles) => (roles.length > 0));
      },
    },
    // {
    //   field: 'lead Actor',
    //   type: 'Number',
    //   // isSearchable: true,
    //   get(movie) {
    //     return 12;
    //   },
    //   search(query, search) {
    //     return query;
    //     query.include.push({
    //       model: models.roles,
    //       as: 'roles',
    //       attributes: ['name', 'leadRole'],
    //       // required: false,

    //       // RESTRICT JOIN TO SPECIFIC RECORDS UPON CONDITION
    //       // where: {
    //       //   [Op.and]: [
    //       //     {
    //       //       lead_role: { [Op.eq]: true },
    //       //     },
    //       //     {
    //       //       name: { [Op.like]: `%${search}%` },
    //       //     },
    //       //   ],
    //       // },
    //     });
      
    //     // TRY USING SEQUELIZE LITERAL
    //     // const searchCondition = models.sequelize.literal(`roles.name ILIKE '%${search}%'`);

    //     // TRY BUILDING QUERY USING THE DOC SYNTAX
    //     const searchCondition = {
    //       [Op.and]: [
    //         // models.sequelize.literal(`roles.name ILIKE '%${search}%'`),
    //         { '$roles.lead_role$': { [Op.eq]: true } },
    //         { '$roles.name$': { [Op.like]: `%${search}%` } },
    //       ],
    //     };

    //     // TRY BUILDING QUERY WITH DIFFERENT SYNTAX
    //     // {
    //     //   // where: {
    //     //   //   $and: [
    //     //   //     {
    //     //   //       '$roles.leadRole$': {
    //     //   //         $eq: true,
    //     //   //       },
    //     //   //     },
    //     //   //     {
    //     //   //       '$roles.name$': {
    //     //   //         $like: `%${search}%`,
    //     //   //       },
    //     //   //     },
    //     //   //   ],
    //     //   // },


    //     // query.where.push(searchCondition);
    //     return query;

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
    // },
  ],
  segments: [],
  // searchFields: ['id'],
});
