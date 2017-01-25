new Vue({
  el: '#visio-sdk',

  data: () => {
    return {
      user_id: '',
      input: '',
      contactInput: '',
      contacts: []
    }
  },

  mounted: function () {
    Visio.init({
      api_key: 'UIRg{FoXblGhZJK5h)nJ<>H-6R4Ea5',
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
      Visio.api('/users/search', 'POST', {email: 'max@comp.test'}, function (status, response) {
        if (status == 200) {
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
