// "use strict"
var menu = require('node-menu');
var app = require('./app.js');

var building = new app.Building("Waterfront Tower");
var people = [];

// --------------------------------
menu.addDelimiter('-', 40, building.address + " rental app");

menu.addItem('Add manager', 
  function(name, contact) {
    var aManager = new app.Manager(name, contact);
    aManager.addBuilding(building);
    building.setManager(aManager);
    people.push(new app.Manager(name, contact));
  },
  null, 
  [{'name': 'name', 'type': 'string'}, {'name': 'contact', 'type': 'string'}]
);

menu.addItem('Add tenant', 
  function(name, contact) {
    people.push(new app.Tenant(name, contact));
  },
  null, 
  [{'name': 'name', 'type': 'string'}, {'name': 'contact', 'type': 'string'}]
);

menu.addItem('Show tenants:', 
  function() {
    for (var i = 0; i <= people.length; i++) {
      if (people[i] instanceof app.Tenant){
        console.log("\n" + people[i].name + " " + people[i].contact);
        var references = people[i].references;
        if(!references) {continue;}
        for (var j = references.length - 1; j >= 0; j--) {
          console.log("-> Reference: " + references[j].name + " " + references[j].contact);
        }
      }
    }
  }
);
menu.addItem('Show managers:', 
  function() {
    for (var i = 0; i <= people.length; i++) {
      if (people[i] instanceof app.Manager){
        console.log("\n" + people[i].name + " " + people[i].contact);
        }
      }
    }
  }
);

menu.addItem('Add unit', 
  function(number, sqft, rent) {
    var aUnit = new app.Unit(number, building, sqft, rent);
    building.units.push(aUnit);
  },
  null, 
  [{'name': 'number', 'type': 'string'},
    {'name': 'sqft', 'type': 'numeric'}, 
    {'name': 'rent', 'type': 'numeric'}]
);

menu.addItem('Show all units', 
  function() {
    for(var i = building.units.length - 1; i >= 0; i--) {
      console.log(" tenant: " + building.units[i].tenant +
      			  " num: " + building.units[i].number + 
                  " sqft: " + building.units[i].sqft +
                  " rent: $" + building.units[i].rent);
    }
  }  
);

menu.addItem('Show available units', 
  function() {
    for(var i = building.units.length - 1; i >= 0; i--) {
      if (building.units[i].available()){
      console.log(" tenant: " + building.units[i].tenant +
              " num: " + building.units[i].number + 
                  " sqft: " + building.units[i].sqft +
                  " rent: $" + building.units[i].rent);
      }
    }
  } 
);

menu.addItem('Add tenant reference', 
  function(tenant_name, ref_name, ref_contact) {
    var error = true;
    for (var i = 0; i < people.length; i++) {
      if (people[i].name == tenant_name && people[i] instanceof app.Tenant){
        people.push(new app.Person(ref_name, ref_contact));
        people[i].addReference(people[people.length-1]);
        error = false;

      }
    }
    if(error){console.log("Error unknown Tenant");}
  },  
    null, 
    [{'name': 'tenant_name', 'type': 'string'},
    {'name': 'ref_name', 'type': 'string'},
    {'name': 'ref_contact', 'type': 'string'}] 
);

menu.addItem('(implement me) Move tenant in unit', 
  function(unit_number, tenant_name) {
      // find tenant and unit objects, use building's addTenant() function.
    var localTenant = null;
    var localUnit = null;
    for (var i = 0; i < people.length; i++) {
      if (people[i].name == tenant_name && people[i] instanceof app.Tenant){
        localTenant = people[i];
      }
    }
    for (var j = 0; j < building.units.length; j++) {
      if (building.units[j].number == unit_number){
        localUnit = building.units[j];
      }
    }
    if(!(localUnit && localTenant)){console.log("error Unkown Unit or Tenant");}
    else{building.addTenant(localUnit, localTenant);}
    },
    null, 
    [{'name': 'unit_number', 'type': 'string'},
    {'name': 'tenant_name', 'type': 'string'}] 
);

menu.addItem('(implement me) Evict tenant', 
      // Similar to above, use building's removeTenant() function.
    function(tenant_name) {
    for (var j = 0; j < building.units.length; j++) {
      if (building.units[j].tenant.name == tenant_name){
        building.removeTenant(units[j],units[j].tenant);
      }
    }
    },
    null, 
    [{'name': 'tenant_name', 'type': 'string'}] 
);

menu.addItem('(implement me) Show total sqft rented', 
  function() {
    var sqft = 0;
    for(var i = building.units.length - 1; i >= 0; i--) {
      if (!building.units[i].available()){
        sqft += units[i].sqft;
      }
    }
    console.log(sqft);
  } 
);

menu.addItem('(implement me) Show total yearly income', 
  function() {
    var income = 0;
    for(var i = building.units.length - 1; i >= 0; i--) {
      if (!building.units[i].available()){
        income += units[i].rent;
      }
    }
    console.log(income);
    } 
);


// *******************************
menu.addDelimiter('*', 40);

menu.start();