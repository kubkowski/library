Book = Backbone.Model.extend({
	urlRoot : '/books',
	defaults: {
		author_id: 0,
		title: '',
		ISBN: '0000000000000',
		publisher_id: 0,
		published_year : 1900
	}
})