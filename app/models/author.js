window.Author = Backbone.Model.extend({
	urlRoot: '/authors/',
	defaults: {
		firstName: "",
		lastName: ""
	}
})