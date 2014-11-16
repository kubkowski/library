Author = Backbone.Model.extend({
	urlRoot: '/authors',
	defaults: {
		first_name: "",
		last_name: ""
	},
  validation: {
    first_name: {
      required: true,
      msg: "Enter author first name"
    },
    last_name: {
      required: true,
      msg: "Enter author last name"
    }
  }
});