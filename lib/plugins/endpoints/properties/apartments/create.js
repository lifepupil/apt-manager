'use strict';

var Property = require('../../../../models/property');
// var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'POST',
    path: '/properties/{propertyId}/apartments',
    config: {
      // validate: {
      //   params: {
      //     propertyId: Joi.string().min(3).required()
      //   }
      // },
      description: 'Create an apartment',
      handler: function(request, reply){
        var pId = request.params.propertyId;
        Property.findOne({_id: pId}, function(err, prop){
          // console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
          // console.log('THIS IS THE err', err);
          // console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
          // console.log('THIS IS THE pId', pId);
          // console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
          // console.log('THIS IS THE prop', prop);
          if(err){ return reply(err).code(400); }
          if(!prop){ return reply().code(400); }
          prop.apartments.push(request.payload);
          prop.save(function(){
            return reply(prop.apartments[prop.apartments.length-1]);
          });
        });
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'properties.createApartment'
};
