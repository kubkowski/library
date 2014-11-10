Book = Backbone.Model.extend({
	urlRoot : '/books',
	defaults: {
		author: {
			first_name: '',
			last_name: ''
		},
		title: '',
		ISBN: '0000000000000',
		publisher: {
			name: '',
			established_year: 1900
		},
		published_year : 1900
	}
})