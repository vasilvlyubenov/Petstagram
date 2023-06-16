const Pet = require('../models/Pet');

exports.create = (petData) => Pet.create(petData);

exports.getById = (petId) => Pet.findById(petId);