new Vue({
  el: '#visio-sdk',

  data: () => {
    return {

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
    }

  }
});
