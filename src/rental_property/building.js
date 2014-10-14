//"use strict"

function Building(address) {
  this.address = address;
  // ...
  this.units = [];
  // ...
}

Building.prototype.setManager = function(person) {
  // set this.manager to person. Person needs to be of type Manager.
  //
  // we can't use `instanceof` here because requiring the Manager
  // class in this file would create a circular dependency. therefore,
  // we're giving you this `if` statement for free.  in most other
  // cases you can use `instanceof` to check the class of something.
  if (person.constructor.name === "Manager") {
    this.manager = person;
  }
};

Building.prototype.getManager = function(){
  // return this.manager 
  return this.manager;
};

Building.prototype.addTenant = function(unit, tenant) {
  // add tenant but check to make sure there
  // is a manager first and a tenant has 2 references
  // Note that tenenat does not belong to Building, but to Unit
  if(this.manager && 
    tenant.references.length > 1 && 
    unit.available() && 
    tenant.constructor.name === "Tenant" && 
    this.units.indexOf(unit) >= 0){
        unit.tenant = tenant;
  }
};

Building.prototype.removeTenant = function(unit, tenant) {
  // remove tenant
    if(this.manager && 
      unit.tenant === tenant && 
      this.units.indexOf(unit) >= 0){
        unit.tenant = null;
  }
};

Building.prototype.availableUnits = function(){
  // return units available
  unitsAvailable = [];
  this.units.forEach(function(unit){if(!unit.tenant){unitsAvailable.push(unit);}});
  return unitsAvailable;

};

Building.prototype.rentedUnits = function(){
  // return rented units
  unitsRented = [];
  this.units.forEach(function(unit){if(unit.tenant){unitsRented.push(unit);}});
  return unitsRented;
};

module.exports = Building;
