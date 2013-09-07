PartyStarter.Router.reopen({
  location: 'query'
});

PartyStarter.Router.map(function() {
  this.route('welcome');
  this.route('parties');
  this.resource('party', { path: '/party/:party_id' });
  this.route('oauth', { path: '/oauth/venmo' });
});

PartyStarter.IndexRoute = Ember.Route.extend({
  activate: function() {
    Ember.$('body').addClass('landing-page');
  },
  deactivate: function() {
    Ember.$('body').removeClass('landing-page');
  }
});

PartyStarter.PartyRoute = Ember.Route.extend({
  model: function(params) {
    return PartyStarter.Party.find(params.party_id);
  }
});

PartyStarter.OauthRoute = Ember.Route.extend({
  beforeModel: function() {
    var params = this.queryParams()
      , that = this;

    console.log(params);

    Parse.Cloud.run('linkVenmo', { code: params.code }, {
      success: function(response) {
        Parse.User.logIn(response.username, "fake venmo password", {
          success: function() {
            that.transitionTo('welcome');
          }
        , error: function(u, error) {
            that.transitionTo('index');
          }
        });
      }
    , error: function(response) {
        console.log(response);
        that.transitionTo('index');
      }
    });
  }
});
