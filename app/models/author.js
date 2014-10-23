window.Author = Backbone.Model.extend({
	url: '/authors',
	defaults: {
		first_name: "",
		last_name: ""
	}
})