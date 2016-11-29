new Vue({
  el: '#search',

  data: () => {
    return {
      errorMessage: '',
      email: '',
      user: {
        user_account: {

        },
        auth_user_jwt_tokens: [
          {
            token: ''
          }
        ]
      },
      signed_token: ''
    }
  },

  methods: {
    findUser: function () {
      this.$http.post('/api/users/search', {email: this.email})
      .then(function (user) {
        if (user.body && user.body.size !== 0) {
          console.log(user.body.signed_token);
          this.user = user.body.user;
          this.signed_token = user.body.signed_token;
          this.errorMessage= '';
        }else {
          this.errorMessage = 'User not found';
          this.resetUser();
        }
      })
      .catch(function (err) {
        this.errorMessage = 'Error while contacting the server';
        this.resetUser();
        console.log(err);
      });
    },

    resetUser: function() {
      this.user = {
        user_account: {

        },
        auth_user_jwt_tokens: [
          {
            token: ''
          }
        ]
      }
    }
  }
});