new Vue({
  el: '#YourOwnChat',

  data: () => {
    return {
      'email': '',
      'message': '',
      'messages': []
    }
  },

  methods: {
    sendMessage: function() {
      var self = this;
      Visio.api('/users/search', 'POST', {email: self.email}, function (status, response) {
        if (status == 200) {
          Visio.api('/rooms/'+response.room_id+'/messages','POST',{text: self.message}, function(status,responseMessages){
            Visio.api('/rooms/'+response.room_id+'/messages','GET',{}, function(status,msgs){
              self.messages = msgs;
              self.message = '';
              self.email = '';
            });
          });
        }
      });
    }
  }
});
