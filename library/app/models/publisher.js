Publisher = Backbone.Model.extend({

  urlRoot: '/publishers',

  defaults: {
    name: '',
    established_year: 1900
  },

  validation: {
    name: {
      required: true,
      msg: 'Enter publisher name'
    },
    established_year: [{
      required: true,
      msg: 'Enter establishing year'
    },
    {
      pattern: 'number',
      msg: 'Year must be a number'
    }]
  }

})