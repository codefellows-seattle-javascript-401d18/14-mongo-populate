'use strict';

const debug = require('debug')('http:child');
const mongoose = require('mongoose');
debug('shut your dirty mouth debugger');

const Child = mongoose.Schema({
  name: { type: String, required: true},
  toys: [{ type: mongoose.Schema.Types.ObjectId, ref: 'toy'}]
}, { timestamps: true});

module.exports = mongoose.model('child', Child);
