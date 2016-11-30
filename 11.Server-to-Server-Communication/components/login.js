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
      this.$http.post('http://localhost:3003/admin/users/login', {}, {
        headers: {
          Authorization: 'JWT '+this.JWT
        },
        credentials: true
      }).then(function (user) {
        var iframe = document.getElementById('visio_local');
        iframe.src = iframe.src;
      }).catch(function (err) {
        this.errorMessage = 'Error while contacting the server';
      });
    }
  }
});
