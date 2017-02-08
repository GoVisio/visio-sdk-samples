new Vue({
  el: '#visio-sdk',

  data: () => {
    return {
      user_id: '',
      input: '',
      targetForCall: '',
      targetForChat: '',
      contactInput: '',
      contacts: []
    }
  },

  mounted: function () {
    Visio.init({
      api_key: '2QxC-u@$^}pJ[5B0L5j:mdT>KDZisi',
      cookie:true,
      language: 'en_GB',
      eventListener: this.getVisioEvents
    });
    this.fetchContacts();
    //this.showChatModule();
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
      Visio.api('/users/search', 'POST', {email: 'rayman@lol.lel'}, function (status, response) {
        if (status == 200) {
          document.getElementById('visio-chat-module').style.display = "block";
          Visio.ui.chatModule({
            userId: response.user_id
          },'visio-chat-module');
        }
      });
    },
    showCallModule: function() {
      var self = this;
      Visio.api('/users/search', 'POST', {email: self.targetForCall}, function (status, response) {
        if (status == 200) {
          document.getElementById('visio-call-module').style.display = "block";
          Visio.ui.callModule({
            userId: response.user_id
          },'visio-call-module');
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
