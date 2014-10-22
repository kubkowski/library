window.PublishersItemView = Backbone.View.extend({
	tagName: "tr",
	template: _.template($("#publishers-list-item").html()),
	render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
     }
});

window.PublishersListView = Backbone.View.extend({
	el: '.page',
	render: function(){
		var self = this;
    _.each(self.publishers.models, function(publisher) {
      self.$el.append(new PublishersItemView({model: publisher}).render().el);
    });
	}
});