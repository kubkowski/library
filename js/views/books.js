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
      success: function ( books ) {
        _.each( books.models, function ( book ) {
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
    var self = this;
    self.book = this.model;
    self.author = new Author({id: this.model.attributes.author_id});
    self.publisher = new Publisher({id: this.model.attributes.publisher_id});
    $.when( self.author.fetch() , self.publisher.fetch() ).done( function () {
      self.$el.html(self.template({
        author: self.author.attributes,
        book: self.book.attributes,
        publisher: self.publisher.attributes
      }));
    });
    return this;
  }

});


EditBook = Backbone.View.extend({

  el: '.container',

  template: _.template($('#edit-book').html()),

  render: function ( options ) {
    var self = this;
    self.authors = new Authors();
    self.publishers = new Publishers();
    $.when( self.authors.fetch() , self.publishers.fetch() ).done( function () {  
      if ( options.id ) {
      self.book = new Book({id: options.id});
      self.book.fetch({
        success: function ( book ) {
          self.book = book;
          self.bookAuthor = new Author({id: self.book.attributes.author_id});
          self.bookPublisher = new Publisher({id: self.book.attributes.publisher_id});
          $.when( self.bookAuthor.fetch() , self.bookPublisher.fetch() ).done( function () {
            self.$el.html(self.template({
              book: self.book.attributes,
              authors: self.authors.models,
              publishers: self.publishers.models,
              author: self.bookAuthor.attributes,
              publisher: self.bookPublisher.attributes
            }));
          });
        }
      });
      } else {
        self.$el.html(self.template({
          book: null,
          authors: self.authors.models,
          publishers: self.publishers.models
        }));
      }
    });

  },

  events: {
    'submit .edit-book-form': 'saveBook',
    'click .delete' : 'deleteBook',
    'click .return' : 'returnToList'
  },

  saveBook: function ( ev ) {
    var self = this;
    self.bookDetails = $(ev.currentTarget).serializeObject();
    self.book = new Book({id: self.bookDetails.id});
    Backbone.Validation.bind(this, {
      model: self.book
    });
    self.bookDetails.ISBN = self.bookDetails.ISBN.replace('-','');
    var errors = self.book.preValidate(self.bookDetails);
    if ( errors ) {
      var $errors = $('ul#errors');
      var msgs = _.values(errors);
      $errors.empty();
      _.each( msgs, function ( msg ) {
        $errors.append("<li>"+ msg + "</li>");
      });
    } else {
      self.book.save(self.bookDetails, {
        success: function () {
          alert("Dane zapisano");
          self.undelegateEvents();
          router.navigate('/books', {trigger: true});
        }
      });
    }
    return false;
  },

  deleteBook: function () {
    var self = this;
    if ( confirm('Are you sure you want to delete that book?') ) {
      this.book.destroy({
        success: function () {
          self.undelegateEvents();
          router.navigate('/books', {trigger: true});
        }
      });
    }
    return false;
  },

  returnToList: function () {
    this.undelegateEvents();
    router.navigate('/books', {trigger: true});
    return false;
  }

});