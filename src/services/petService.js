const Pet = require('../models/Pet');

exports.create = (petData) => Pet.create(petData);

exports.getById = (petId) => Pet.findById(petId);

exports.delete = (petId) => Pet.findByIdAndDelete(petId);

exports.update = (petId, petData) => Pet.findByIdAndUpdate(petId, petData);