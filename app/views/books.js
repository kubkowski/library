BooksListHeader = Backbone.View.extend({
	el: '.container',
	template: _.template($("#books-list").html()),
	render:function(){
		this.$el.html(this.template);
	}
});

BooksList = Backbone.View.extend({
	el: '.page',
	render: function(){
		var self = this;
		var books = new Books();
		books.fetch({
			success: function(books){
					_.each(books.models, function(book){
						self.$el.append(new BooksItemView({model: book}).render().el)
					});
			}
		});				
	}
});

BooksItemView = Backbone.View.extend({
	tagName: 'tr',
	template: _.template($("#books-list-item").html()),
	render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

EditBook = Backbone.View.extend({
	el: '.container',
	template: _.template($('#edit-book').html()),
	render: function(options){
		var self = this;
		if (options.id) {
			self.book = new Book({id: options.id});
			self.book.fetch({
				success: function(book){
					self.$el.html(self.template({book: book}));
				}
			});
		} else {
			this.$el.html(this.template({book: null}));
		}				
	},
	events: {
		'submit .edit-book-form': 'saveBook',
		'click .delete' : 'deleteBook'
	},
	saveBook: function(ev){
		var bookDetails = $(ev.currentTarget).serializeObject();
		var book = new Book();
		book.save(authorDetails, {
		success: function(){
				router.navigate('/books', {trigger:true});
			}
		});
		return false;
	},
	deleteBook: function(ev){
		if (confirm('Are you sure you want to delete that book?')) {
			this.book.destroy({
				success: function(){
					router.navigate('/books', {trigger:true});
				}
			});
		};
		return false;
	}
});