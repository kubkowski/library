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