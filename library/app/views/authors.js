AuthorsListHeader = Backbone.View.extend({
	el: '.container',
	template: _.template($("#authors-list").html()),
	render:function(){
		this.$el.html(this.template);
	}
});

AuthorsList = Backbone.View.extend({
	el: '.page',
	render: function(){
		var self = this;
		var authors = new Authors();
		authors.fetch({
			success: function(authors){
					_.each(authors.models, function(author){
						self.$el.append(new AuthorsItemView({model: author}).render().el)
					});
			}
		});				
	}
});

AuthorsItemView = Backbone.View.extend({
	tagName: 'tr',
	template: _.template($("#authors-list-item").html()),
	render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});	

EditAuthor = Backbone.View.extend({
	el: '.container',
	template: _.template($('#edit-author').html()),
	render: function(options){
		var self = this;
		if (options.id) {
			self.author = new Author({id: options.id});
			self.author.fetch({
				success: function(author){
					self.$el.html(self.template({author: author}));
				}
			});
		} else {
			this.$el.html(this.template({author: null}));	
		}				
	},
	events: {
		'submit .edit-author-form': 'saveAuthor',
		'click .delete' : 'deleteAuthor',
		'click .return' : 'returnToList'
	},
	saveAuthor: function(ev){
		var authorDetails = $(ev.currentTarget).serializeObject();
		console.log(authorDetails);
		var self = this;
		author = new Author();
		author.save(authorDetails, {
			success: function(){
				router.navigate('/authors', {trigger:true});
				self.unbind();
			}
		});
		return false;
	},
	deleteAuthor: function(ev){
		if (confirm('Are you sure you want to delete that author?')) {
			this.author.destroy({
				success: function(){
					router.navigate('/authors', {trigger:true});
				}
			});
		}
		return false;
	},
	returnToList: function(){
		router.navigate('/authors', {trigger:true});
		return false;
	}
});