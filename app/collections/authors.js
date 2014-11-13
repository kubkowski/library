Authors = Backbone.Collection.extend({
	url: '/authors',
	model: Author,
	comparator: 'last_name'
});