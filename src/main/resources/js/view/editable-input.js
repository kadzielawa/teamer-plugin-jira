define('view/editable-input', ['jquery',  'backbone','underscore','mustache',], function($, Backbone,_,mustache) {

    var ContentEditableView = Backbone.View.extend({
        tagName: 'p',
        templates: {
            'editableContainer' : $('#editInputTemplate').html()
        },
        events: {
            "click .edit": 'onEdit',
            "blur .content": 'onEditDone'
        },
        options: null,
        initialize: function (options) {
            this.options = options;
        },

        render: function () {
            this.$el.html(mustache.render(this.templates.editableContainer,this.options));

            // caching jQuery object is better than querying the DOM each time.
            this.$content = this.$('.content');
            return this;
        },

        onEdit: function (e) {
            e.preventDefault();
            this.$content.attr('contenteditable', true).focus();
        },
        onEditDone: function () {
            this.$content.attr('contenteditable', false);
        }
    });
return ContentEditableView;

});

