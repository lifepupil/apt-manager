/* eslint no-reserved-keys: 0 */

'use strict';

var Mongoose = require('mongoose');

var propertySchema = Mongoose.Schema({
  name: {type: String, required: true},
  address: {type: String, required: true},
  createdAt: {type: Date, required: true, default: Date.now},
  managerId: {type: Mongoose.Schema.ObjectId, ref: 'User', required: true},
  apartments: [{}]
});

module.exports = Mongoose.model('Property', propertySchema);
