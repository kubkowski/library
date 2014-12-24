Books = Backbone.Collection.extend({

  url: '/books',
  model: Book,
  comparator: 'title'

})