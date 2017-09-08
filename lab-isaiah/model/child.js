'use strict';

const debug = require('debug')('http:child');
const mongoose = require('mongoose');
debug('child.js debug disarm');

const Child = mongoose.Schema({
  name: { type: String, requried: true},
  toys: [{ type: mongoose.Schema.Types.ObjectId, ref: 'toy'}],
}, {timestamps: true});

module.exports = mongoose.model('child', Child);
