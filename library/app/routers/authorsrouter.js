AuthorsRouter = Backbone.Router.extend({

  routes: {
    '': 'authorsList',
    'authors': 'authorsList',
    'authors/new': 'editAuthor',
    'authors/edit/:id': 'editAuthor',
    'authors/delete/:id' : 'deleteAuthor'
  },

  authorsList: function () {
    $('li').removeClass('active');
    $('#authors').addClass('active');
    var header = new AuthorsListHeader();
    header.render();
    var authorsList = new AuthorsList();
    authorsList.render();
  },

  editAuthor: function ( id ) {
    var editAuthor = new EditAuthor();
    editAuthor.render({id: id});
  },

  deleteAuthor: function ( id ) {
    var self = this;
    var $errors = $('#errors');
    self.id = id;
    self.author = new Author({id: id});
    self.books = new Books();
    self.books.fetch({
      success: function () {
        var msg = "There are still books connected to this author (please delete them first)";
        var bookCount = 0;
        _.each( self.books.models, function( book ) {
          if ( String(book.attributes.author_id) === String(self.id) ) {
            bookCount += 1;
          }
        });
        if ( bookCount > 0 ) {
          $errors.empty();
          $errors.append("<li>"+ msg + "</li>");
        } else {
          if ( confirm('Are you sure you want to delete that author?') ) {
            self.author.destroy({
              success: function () {
                router.navigate('/authors', {trigger:true});
              }
            });
          }
        }
      }
    });
  }
});

var authorsrouter = new AuthorsRouter();