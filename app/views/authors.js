window.AuthorsItemView = Backbone.View.extend({
	tagName: "div",
	template: _.template($("#author-list-item").html()),
	render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
     }
});

window.AuthorsListView = Backbone.View.extend({
	el: '.page',
	render: function(){
		var self = this;
    _.each(self.authors.models, function(author) {
      self.$el.append(new AuthorsItemView({model: author}).render().el);
    });
	}
});