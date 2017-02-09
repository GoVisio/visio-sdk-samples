new Vue({
  el: '#visio-sdk',

  data: () => {
    return {
      user_id: '',
      input: '',
      targetForCall: '',
      targetForChat: '',
      targetForLiteCall: '',
      contactInput: '',
      contacts: [],
      error: {
        targetForCall: '',
        targetForChat: '',
        targetForLiteCall: ''
      }
    }
  },

  mounted: function () {
    Visio.init({
      api_key: '$p}9kBNWPQb:CE<_xC9@,zgdD@{^qK',
      cookie:true,
      language: 'en_GB',
      eventListener: this.getVisioEvents
    });
    this.fetchContacts();
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
      if (self.targetForChat) {
        self.error.targetForChat = null;
        Visio.api('/users/search', 'POST', {email: self.targetForChat}, function (status, response) {
          if (status == 200) {
            document.getElementById('visio-chat-module').style.display = "block";
            Visio.ui.chatModule({
              userId: response.user_id
            },'visio-chat-module');
          }
        });
      }else {
        self.error.targetForChat = 'email is required to chat';
      }
    },
    showCallModule: function() {
      var self = this;
      if (self.targetForCall) {
        self.error.targetForCall = null;
        Visio.api('/users/search', 'POST', {email: self.targetForCall}, function (status, response) {
          if (status == 200) {
            document.getElementById('visio-call-module').style.display = "block";
            Visio.ui.callModule({
              userId: response.user_id
            },'visio-call-module');
          }
        });
      }else {
        self.error.targetForCall = 'email is required to call';
      }
    },
    showLiteCallModule: function() {
      var self = this;
      if (self.targetForLiteCall) {
        self.error.targetForLiteCall = null;
        Visio.api('/litecall', 'POST', {
          email: self.targetForLiteCall,
          device: ''
        }, function (status, response) {
          if (status == 200) {
            document.getElementById('visio-litecall-module').style.display = "block";
            Visio.ui.litecallModule({
              token: response.token,
              device: Math.floor((Math.random() * 100000) + 1)
            },'visio-litecall-module');
          }
        });
      }else {
        self.error.targetForLiteCall = 'email is required to call';
      }
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
    },
    fetchContacts: function() {
      var self = this;
      Visio.api('/rooms', 'GET', {}, function(status, response) {
        if (response && response.length > 0) {
          response.forEach(function(room) {
            room.room_members.forEach(function(room_member) {
              self.contacts.push(room_member.user);
            });
          });
        }
      });
    }
  }
});
