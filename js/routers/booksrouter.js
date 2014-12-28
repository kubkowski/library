BooksRouter = Backbone.Router.extend({

  routes: {
    'books' : 'booksList',
    'books/new' : 'editBook',
    'books/edit/:id' : 'editBook',
    'books/delete/:id' : 'deleteBook'
  },

  booksList: function () {
    $('li').removeClass('active');
    $('#books').addClass('active');
    var header = new BooksListHeader();
    header.render();
    var booksList = new BooksList();
    booksList.render();
  },

  editBook: function ( id ) {
    var editBook = new EditBook();
    editBook.render({id: id});
  },

  deleteBook: function ( id ) {
    var book = new Book({id: id});
    if ( confirm('Are you sure you want to delete that book?') ) {
      book.destroy({
        success: function () {
          router.navigate('/books', {trigger:true});
        }
      });
    }
  }

});

var booksrouter = new BooksRouter();