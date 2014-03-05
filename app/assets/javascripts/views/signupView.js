SignupView = Backbone.View.extend({
  el: '#signup-view',
  events: { 'submit form':   'createUser' },

  attributes: function () {
    return {
      name: this.nameField.val(),
      email: this.emailField.val(),
      password: this.passwordField.val(),
      password_confirmation: this.passwordConfirmationField.val()
    };
  },

  createUser: function () {
    if (this.submitButton.hasClass('disabled') && this.form.data('user-created') !== true) {
      return false;
    } else {
      this.submitButton.addClass('disabled');
    }

    var self = this,
        user = new User(this.attributes());
    user.save(null, {
      error: function (originalModel, resp, options) {
        self.$el.find('input').removeClass('error');
        var errors = JSON.parse(resp.responseText).errors;
        _.each(errors, function(value, key) { 
          self.$el.find('input[name=' + key +']').addClass('error');
        });
        self.submitButton.removeClass('disabled');
      },
      success: function () {
        self.form.data('user-created', true);
        document.location.href = '/';
      }
    });

    return (this.form.data('user-created') === true);
  },

  initialize: function () {
    this.form = this.$el.find('form');
    this.nameField = this.$el.find('input[name=name]');
    this.emailField = this.$el.find('input[name=email]');
    this.passwordField = this.$el.find('input[name=password]');
    this.passwordConfirmationField = this.$el.find('input[name=password_confirmation]');
    this.submitButton = this.$el.find('input[type=submit]');
  },

});