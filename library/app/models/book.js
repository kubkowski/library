Book = Backbone.Model.extend({

  urlRoot : '/books',

  defaults: {
    title: '',
    ISBN: '0000000000000',
    published_year : 1900
  },

  validation: {
    author_id: {
      required: true,
      msg: 'Select author'
    },
    title: {
      required: true,
      msg: 'Enter title'
    },
    publisher_id: {
      required: true,
      msg: 'Select publisher'
    },
    published_year: {
      required: true,
      msg: 'Select year of publishing'
    },
    ISBN: [{
        pattern: 'number',
        msg: 'Please enter valid ISBN number'
      },
      {
        required: true,
        msg: 'Please enter ISBN number'
      },
      {
        length: 13,
        msg: 'Incorrect ISBN number length (it should have 13 digits)'
      }] 
  }

})