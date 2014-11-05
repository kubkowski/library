window.AuthorsItemView = Backbone.View.extend({
	tagName: "tr",
	template: _.template($("#authors-list-item").html()),
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

		window.EditAuthorView = Backbone.View.extend({
			el: '.container',
			template: _.template($('#edit-author').html()),
			render: function(){
					this.$el.html(this.template(this.model.toJSON()));
					//return this;
			},
			events: {
				'submit .edit-author-form': 'saveAuthor'
			},
			saveAuthor: function(ev){
				var authorDetails = $(ev.currentTarget).serializeObject();
				var author = new Author();
				console.log(author);
				console.log(authorDetails);
				author.save(authorDetails, {
				success: function(author){
						router.navigate('', {trigger:true});
					}
				});
				console.log(authorDetails);
				return false;
			}
		});