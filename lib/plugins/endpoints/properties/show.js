'use strict';

var Property = require('../../../models/property');
// var Joi = require('joi');
// var Properties = require('../../../models/property');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/properties/show/{propertyId}',
    config: {
      // validate: {
      //   payload: {
      //     name: Joi.string().min(3).required(),
      //     address: Joi.string().min(3).required()
      //   }
      // },
      description: 'Get properties belonging to a manager',
      handler: function(request, reply){
        var pId = request.params.propertyId;
        Property.findOne({_id: pId}, function(err, prop){
          console.log('THIS IS THE PROPERTY', prop);
          console.log('THIS IS THE ERROR', err);
          if(err){ return reply(err).code(400); }
          return reply (prop);
        });
        // var property = new Property(request.payload);
        // property.managerId = request.auth.credentials._id;
        // property.save(function(){
        //   return reply(property);
        // });
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'properties.show'
};
