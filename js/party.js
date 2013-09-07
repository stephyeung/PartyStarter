$(document).ready(function() {
  Parse.initialize("vpkqQoxmJU4HqOx57O81id3RTSwuKTbGJprxGgQc", "mXbf5O1xhVSjlMb51tjuiXxPI8KOc6jd65upOj3O");

  var Party = Parse.Object.extend("Party");

  function addParty(partyObj) {
    var party = new Party();
    party.set("name", partyObj.name);
    party.set("location", partyObj.location);
    party.set("description", partyObj.description);
    party.set("date", partyObj.date);
    party.save(null, {
      success: function(obj) {
        console.log("Successfully saved a party ", obj);
      }, 
      error: function(obj, err) {
        console.log("An error occured: ", err);
      }
    });
  }

  function getParty(partyid) {
    var query = new Parse.Query(Party);
    query.get(partyid, {
      success: function(party) {
        console.log("retrieved party: ", party);
        return party;
      }
    }, {
      error: function(obj, err) {
        console.log("Failed to fetch object, error: ", err);
      }
    });
  }

  function createParty() {
    
  }

  $('.js-venmo-sign-in').on('click', Venmo.auth);
});
