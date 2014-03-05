var User = Backbone.Model.extend({
  url: '/account',
  paramRoot: 'user',

  authenticate: function (password, callback) {
    var self = this;

    $.ajax({
      type: 'POST',
      url:  '/session.json',
      data: {
        email: this.get('email'),
        password: password
      },
      success: function (data) {
        if (data.error) {
          callback.call(this, data.error, self);
        } else {
          self.set(data);
          callback.call(this, null, self);
        }
      }
    });
  },

});

User.authorize = function (attrs, callback) {
  var user = new User({email: attrs.email});
  user.authenticate(attrs.password, callback);
};