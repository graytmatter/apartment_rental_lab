var Person = require("./person.js");

function Tenant(name, contact) {
  // inherits name contact from Person
  Person.call(this, name, contact);
  // tennant has 'array' of references
  this.references = [];

}

// Set prototype and constructor
// ...
Tenant.prototype = new Person();
Tenant.prototype.constructor = Tenant;

Tenant.prototype.addReference = function(reference){
  if(reference instanceof Person){
    this.references.push(reference);
  }
};

Tenant.prototype.removeReference = function(reference) {
  // remove reference from references.
  this.references.splice(this.references.indexOf(reference), 1);
  return this;
};

module.exports = Tenant;
