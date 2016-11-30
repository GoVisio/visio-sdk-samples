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
    }

  }
});
