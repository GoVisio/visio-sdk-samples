new Vue({
  el: '#users',

  data: () => {
    return {
      errorMessage: '',
      user: { firstname: '', lastname: '', email: '', phone: ''},
      users: []
    }
  },

  mounted: function () {
    this.$nextTick(function () {
      this.fetchUsers();
    })
  },

  methods: {

    fetchUsers: function () {
      this.$http.get('/api/users')
      .then(function (users) {
        this.users = users.body
      })
      .catch(function (err) {
        this.errorMessage = err;
      });
    },

    addUser: function () {
      this.errorMessage = '';
      if (this.user.email.trim() || this.user.phone.trim()) {
        this.$http.post('/api/users', this.user).then(function (res) {
          this.user.user_account = Object.assign(this.user);
          this.users.push(this.user);
        }).catch(function (err) {
          this.errorMessage = err.body;
        });
      }else {
        this.errorMessage = 'Email or Phone required'
      }
    },

    deleteUser: function (index) {
      this.errorMessage = '';
      const user = this.users[index];
      if (confirm('Confirmer la suppr. ？')) {
        this.$http.delete('api/users/' + user.id_user)
        .then(function (res) {
          this.users.splice(index, 1);
        })
        .catch(function (err) {
          this.errorMessage = err;
        });
      }
    }
  }
});
