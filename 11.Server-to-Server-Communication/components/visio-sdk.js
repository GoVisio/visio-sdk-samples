new Vue({
  el: '#visio-sdk',

  data: () => {
    return {
      user_id: '',
      input: '',
      contactInput: ''
    }
  },

  mounted: function () {
    Visio.init({
      api_key: 'Ue$sgR8Nr5:_LUfA4rDMT3JpyRd[84',
      cookie:true,
      language: 'en_GB',
      eventListener: this.getVisioEvents
    });
  },

  methods: {

    getVisioEvents: function(data) {
      console.log(data);
    },

    showPrivateCalendar: function() {
      Visio.ui.privateCalendar({
        user:{
          email: "john.doe@test.com",
          firstname: "John",
          lastname: "Doe"
        },
        readonly: false,
        meeting:{
          notes: "This is a test meeting",
          meeting_name: "Test Meeting"
        }
      }, "ClientSDK");
      document.getElementById("ClientSDK").style.display = "block";
    },

    showChatModule: function() {
      var self = this;
      Visio.api('/users/search', 'POST', {email: self.input}, function (status, response) {
        if (status == 200) {
          console.log(response.user_id);
          Visio.ui.chatModule({
            userId: response.user_id
          },'visio-chat-module');
        }
      });
    },

    addContact: function() {
      var self = this;
      Visio.api('/rooms', 'POST', {
        email: self.contactInput,
        firstname:"Alan",
        lastname:"Smithee",
        force_accept: true
      },
      function(status, response) {
        console.log(response);
      });
    }

  }
});
