'use strict';

const debug = require('debug')('hhtp:model-toy');
const mongoose = require('mongoose');
debug('shutup debug');

const Toy = mongoose.Schema({
  name: {type: String, required: true},
  desc: {type: String, required: true}
}, {timestamps: true});

module.exports = mongoose.model('toy', Toy);
