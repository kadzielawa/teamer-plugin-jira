define('view/editable-input', ['jquery',  'backbone','underscore','js/mustache',], function($, Backbone,_,mustache) {

    var ContentEditableView = Backbone.View.extend({
        tagName: 'div',
        className: "editable-field-input",
        templates: {
            'editableContainer' : $('#editInputTemplate').html()
        },
        events: {
            "click .edit": 'onEdit',
            "blur .content": 'onEditDone',
            "mouseenter": 'mouseenter',
            "click .input-editable-cancel" : "cancel",
            "mouseleave": 'mouseleave'
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
        cancel: function (e) {
            $(e.currentTarget).parent().hide()

        },
        mouseleave: function (e) {

            var $editableContainer = $(e.currentTarget);
            $editableContainer.find('.editable-container').css({'border':'0'});
            $(e.currentTarget).find('.overlay-icon').hide();
            this.$el.find('.save-options').hide();

        },
        mouseenter: function (e) {
            var $editableContainer = $(e.currentTarget);
            $editableContainer.find('.editable-container').css({'border':'1px solid lightgrey'});
            $(e.currentTarget).find('.overlay-icon').show();
        },
        onEdit: function (e) {
            e.preventDefault();
            this.$content.attr('contenteditable', true).focus();
            this.$el.find('.save-options').show();
            this.$el.find('.overlay-icon').hide();
        },
        onEditDone: function () {
            this.$content.attr('contenteditable', false);

        }
    });
return ContentEditableView;

});

