const { collection } = require('forest-express-sequelize');
const sequelize = require('sequelize');
const models = require('../models');

const { Op } = sequelize;
// const models = require('../models');

collection('movies', {
  actions: [{
    name: 'update movie characteristics',
    type: 'single',
    fields: [{
      field: 'language',
      type: 'Boolean',
      description: 'insert value to update field',
    }, {
      field: 'gore',
      type: 'Boolean',
      description: 'insert value to update field',
    }, {
      field: 'drugs',
      type: 'Boolean',
      description: 'insert value to update field',
    }, {
      field: 'graphicViolence',
      type: 'Boolean',
      description: 'insert value to update field',
    }, {
      field: 'nudity',
      type: 'Boolean',
      description: 'insert value to update field',
    }],
    values: async (context) => {
      console.log(context);
      // wait until you fetch the movie record - do not forget to include the movie characteristics model
      const movie = await models.movies.findByPk(context.id, { include: [{ model: models.movieCharacteristics, as: 'movieCharacteristic' }] });
      console.log(movie);
      // Forest will automatically match all of the form fields that have the same name as your movie characteristics fields and prefill with their value
      return movie.movieCharacteristic;
    },
  }],
  fields: [
    {
      field: 'characteristics',
      type: 'String',
      get: (movie) => {
        // check if the movie has a related characteristics record to return smtg or not
        if (movie.movieCharacteristic) {
          // list all your fields from the movieCharacteristics collection you want to display
          const characteristicsNameList = ['language', 'gore', 'drugs', 'graphicViolence', 'nudity'];
          // create empty string which will be filled with a div per field listed above - this string will be the value returned
          let characteristicsList = '';
          // add style that will be used to display the movie_characteristics info
          const characteristicsDivStyle = 'margin: 24px 0px; color: #415574';
          const characteristicsNameStyle = 'padding: 6px 16px; margin: 12px; background-color:#b5c8d05e; border-radius: 6px';
          const characteristicsValueStyleRed = 'padding: 6px 12px; background-color:#ff7f7f87; border-radius: 6px';
          const characteristicsValueStyleGreen = 'padding: 6px 12px; background-color:#7FFF7F; border-radius: 6px';
          // iterate over the list of movie characteristics fields
          for (index = 0; index < characteristicsNameList.length; index++) {
            const fieldName = characteristicsNameList[index];
            // check if the value of the field is 0 or 1 to add the relevant style (default is 0)
            let characteristicsValueStyle = characteristicsValueStyleRed;
            if (movie.movieCharacteristic[fieldName] === true) {
              characteristicsValueStyle = characteristicsValueStyleGreen;
            }
            // insert the div with the field info to the string that will be returned
            characteristicsList += `<div style="${characteristicsDivStyle}">
                <span style="${characteristicsNameStyle}">${fieldName}</span>
                <span style="${characteristicsValueStyle}">${movie.movieCharacteristic[fieldName]}</span>
              </div>`;
          }
          return characteristicsList;
        }
      },
    }, {
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
