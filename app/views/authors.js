

		window.EditAuthorView = Backbone.View.extend({
			el: '.container',
			template: _.template($('#edit-author').html()),
			render: function(){
					this.$el.html(this.template(this.model.toJSON()));
					//return this;
			},
			events: {
				'submit .edit-author-form': 'saveAuthor'
			},
			saveAuthor: function(ev){
				var authorDetails = $(ev.currentTarget).serializeObject();
				var author = new Author();
				console.log(author);
				console.log(authorDetails);
				author.save(authorDetails, {
				success: function(author){
						router.navigate('', {trigger:true});
					}
				});
				console.log(authorDetails);
				return false;
			}
		});