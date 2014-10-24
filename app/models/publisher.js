window.Publisher = Backbone.Model.extend({
	urlRoot: '/publishers/',
	defaults: {
		name: "",
		establishedYear: 1900
	}
})