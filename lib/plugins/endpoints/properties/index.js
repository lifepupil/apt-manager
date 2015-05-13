'use strict';

var Property = require('../../../models/property');
// var Joi = require('joi');
// var Properties = require('../../../models/property');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/properties/{managerId}',
    config: {
      // validate: {
      //   payload: {
      //     name: Joi.string().min(3).required(),
      //     address: Joi.string().min(3).required()
      //   }
      // },
      description: 'Get properties belonging to a manager',
      handler: function(request, reply){
        var mId = request.params.managerId;
        Property.find({managerId: mId}, function(err, props){
          console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
          console.log('property: ', props);
          return reply (props);
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
  name: 'properties.get'
};
