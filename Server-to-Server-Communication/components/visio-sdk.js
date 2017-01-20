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
      api_key: 'B0ca[6Ec<!ZzH91idN7i-Q)E<-x>1Q',
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
