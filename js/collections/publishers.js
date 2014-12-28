Publishers = Backbone.Collection.extend({

  url: '/publishers',
  model: Publisher,
  comparator: 'name'

})