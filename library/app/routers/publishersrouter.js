PublishersRouter = Backbone.router.extend({
  routes: {
    'publishers' : 'publishersList',
    'publishers/new': 'editPublisher',
    'publishers/edit/:id': 'editPublisher',
    'publishers/delete/:id' : 'deletePublisher'
  }
});

var publishersrouter = new PublishersRouter();

publishersrouter.on('route:publishersList', function(){
  $('li').removeClass('active');
  $('#publishers').addClass('active');
  var header = new PublishersListHeader();
  header.render();
  var publishersList = new PublishersList();
  publishersList.render();
});

publishersrouter.on('route:editPublisher', function(id){
  var editPublisher = new EditPublisher();
  editPublisher.render({id: id});
});

publishersrouter.on('route:deletePublisher', function(id){
  var self = this;
  var $errors = $('ul#errors');
  self.id = id;
  self.publisher = new Publisher({id: id});
  self.books = new Books();
  self.books.fetch({
    success: function () {
      var msg = "There are still books connected to this publisher (please delete them first)";
      var bookCount = 0;
      _.each(self.books.models, function(book) {
        if (String(book.attributes.publisher_id) === String(self.id)) {             
          bookCount += 1;
        }
      });
      if (bookCount > 0) {
        $errors.empty();
        $errors.append("<li>"+ msg + "</li>");
      } 
      else {
        if (confirm('Are you sure you want to delete that publisher?')) {
          self.publisher.destroy({
            success: function(){
              router.navigate('/publishers', {trigger:true});
            }
          });
        }
      }       
    }
  });
});