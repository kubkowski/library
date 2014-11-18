BooksListHeader = Backbone.View.extend({
  el: '.container',
  template: _.template($("#books-list").html()),
  render: function () {
    this.$el.html(this.template);
  }
});

BooksList = Backbone.View.extend({
  el: '.page',
  render: function () {
    var self = this;
    var books = new Books();
    var allSubViews = document.createDocumentFragment();
    books.fetch({
      success: function (books) {
        _.each(books.models, function (book) {
          allSubViews.appendChild(new BooksItemView({model: book}).render().el);
        });
        self.$el.append(allSubViews);
      }
    });
  }
});

BooksItemView = Backbone.View.extend({
  tagName: 'tr',
  template: _.template($("#books-list-item").html()),
  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});


EditBook = Backbone.View.extend({
  el: '.container',
  template: _.template($('#edit-book').html()),
  render: function (options) {
    var self = this;
    self.authors = new Authors();
    self.publishers = new Publishers;
    $.when( self.authors.fetch() , self.publishers.fetch() ).done(function () {  
      if (options.id) {
      self.book = new Book({id: options.id});
      self.book.fetch({
        success: function (book) {
          self.$el.html(self.template({
            book: book, 
            authors: self.authors.models,
            publishers: self.publishers.models
          }));
        }
      });
      } else {
        this.$el.html(this.template({book: null}));
      }
    });
    
  },
  events: {
    'submit .edit-book-form': 'saveBook',
    'click .delete' : 'deleteBook',
    'click .return' : 'returnToList'
  },
  saveBook: function (ev) {
    var self = this;
    var bookDetails = $(ev.currentTarget).serializeObject();
    var book = new Book();
    book.save(bookDetails, {
    success: function () {
        self.undelegateEvents();
        router.navigate('/books', {trigger: true});
      }
    });
    return false;
  },
  deleteBook: function () {
    if (confirm('Are you sure you want to delete that book?')) {
      this.book.destroy({
        success: function () {
          router.navigate('/books', {trigger: true});
        }
      });
    }
    return false;
  },
  returnToList: function () {
    router.navigate('/books', {trigger: true});
    return false;
  }
});