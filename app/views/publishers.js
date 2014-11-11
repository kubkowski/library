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
		publishers.fetch({
			success: function(publishers){
					_.each(publishers.models, function(publisher){
						self.$el.append(new PublishersItemView({model: publisher}).render().el)
					});
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
		'click .delete' : 'deletePublisher'
	},
	savePublisher: function(ev){
		var publisherDetails = $(ev.currentTarget).serializeObject();
		var publisher = new Publisher();
		publisher.save(publisherDetails, {
		success: function(){
				router.navigate('/publishers', {trigger:true});
			}
		});
		return false;
	},
	deletePublisher: function(ev){
		if (confirm('Are you sure you want to delete that publisher?')) {
			this.publisher.destroy({
				success: function(){
					router.navigate('/publishers', {trigger:true});
				}
			});
		}	
		return false;
	}
});