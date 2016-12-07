new Vue({
  el: '#test',

  data: () => {
    return {
      email: '',
      JWT: '',
      errorMessage: ''
    }
  },

  methods: {
    logUser: function () {
      this.$http.get('http://localhost:3003/admin/users/test-login', {}, {headers: {Authorization: 'JWT '+this.JWT}})
      .then(function (user) {
        if (user.body && user.body.size !== 0) {
          console.log(user);
          this.user = user.body.user;
          this.errorMessage= '';
        }else {
          this.errorMessage = 'User not found';
        }
      })
      .catch(function (err) {
        this.errorMessage = 'Error while contacting the server';
        console.log(err);
      });
    },
  }
});
