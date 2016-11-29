new Vue({
  el: '#users',

  data: () => {
    return {
      user: { firstName: '', lastName: '', email: '' },
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
        console.log(err);
      });
    },

    addUser: function () {
      if (this.user.email.trim()) {
        this.$http.post('/api/users', this.user)
        .then(function (res) {
          this.user.user_account = {
            firstname: this.user.firstName,
            lastname: this.user.lastName
          };

          this.users.push(this.user);
        })
        .catch(function (err) {
          console.log(err);
        });
      }
    },

    deleteUser: function (index) {
      const user = this.users[index];
      if (confirm('Confirmer la suppr. ？')) {
        this.$http.delete('api/users/' + user.id_user)
        .then(function (res) {
          this.users.splice(index, 1);
        })
        .catch(function (err) {
          console.log(err);
        });
      }
    }
  }
});
