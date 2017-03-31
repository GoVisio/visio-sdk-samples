new Vue({
  el: '#login',

  data: function() {
    return {
      email: '',
      JWT: '',
      errorMessage: ''
    }
  },

  methods: {
    logUser: function () {
      Visio.login(this.JWT, function(status, response) {
        if (status === 200) {
          var iframe = document.getElementById('visio_local');
          iframe.src = iframe.src;
        }else {
          this.errorMessage = response;
        }
      });
    }
  }
});
