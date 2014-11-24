PublishersListHeader = Backbone.View.extend({
	el: '.container',
	template: _.template($("#publishers-list").html()),
	render:function(){
		this.$el.html(this.template);
	}
});

PublishersList = Backbone.View.extend({
	el: '.page',
	render: function(){
		var self = this;
		var publishers = new Publishers();
		var allSubViews = document.createDocumentFragment();
		publishers.fetch({
			success: function(publishers){
					_.each(publishers.models, function(publisher){
						allSubViews.appendChild(new PublishersItemView({model: publisher}).render().el);
					});
					self.$el.append(allSubViews);
			}
		});				
	}
});

PublishersItemView = Backbone.View.extend({
	tagName: 'tr',
	template: _.template($("#publishers-list-item").html()),
	render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

EditPublisher = Backbone.View.extend({
	el: '.container',
	template: _.template($('#edit-publisher').html()),
	render: function(options){
		var self = this;
		if (options.id) {
			self.publisher = new Publisher({id: options.id});
			self.publisher.fetch({
				success: function(publisher){
					self.$el.html(self.template({publisher: publisher}));
				}
			});
		} else {
			this.$el.html(this.template({publisher: null}));
		}				
	},
	events: {
		'submit .edit-publisher-form': 'savePublisher',
		'click .delete' : 'deletePublisher',
		'click .return' : 'returnToList'
	},
	savePublisher: function(ev){
		var self = this;
		self.publisherDetails = $(ev.currentTarget).serializeObject();
		self.publisher = new Publisher();
		Backbone.Validation.bind(this, {
      model: self.publisher
    });
    var errors = self.publisher.preValidate(self.publisherDetails);
    if (errors) {
    	var $errors = $('ul#errors');
    	var msgs = _.values(errors);
    	$errors.empty();
    	_.each(msgs, function (msg) {
    		$errors.append("<li>"+ msg + "</li>");
    	});
    } else {
			self.publisher.save(self.publisherDetails, {
				success: function(){
					alert("Dane zapisano");
					self.undelegateEvents();
					router.navigate('/publishers', {trigger:true});
				}
			});
		}
		return false;
	},
	deletePublisher: function(ev){
		var self = this;
  	var $errors = $('ul#errors');
  	self.books = new Books();
  	self.books.fetch({
    	success: function () {
      	var msg = "There are still books connected to this publisher (please delete them first)";
      	var bookCount = 0;
      	_.each(self.books.models, function(book) {
        	if (String(book.attributes.publisher_id) === String(self.publisher.id)) {             
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
	},
	returnToList: function(){
		this.undelegateEvents();
		router.navigate('/publishers', {trigger:true});
		return false;
	}
});