new Vue({
  el: '#login',

  data: () => {
    return {
      email: '',
      JWT: '',
      errorMessage: ''
    }
  },

  methods: {
    logUser: function () {
      this.$http.post('http://localhost:3003/admin/users/login', {}, {headers: {Authorization: 'JWT '+this.JWT, withCredentials: true})
      .then(function (user) {
        console.log(user);
        if (user.body && user.body.size !== 0) {
          console.log(user);
          this.user = user.body.user;
          this.errorMessage= '';
          this.$http.get('http://localhost:3003/auth/me').then(function(data) {
            console.log(data)
          }).catch(function(e) {
            console.log(e)
          });
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
