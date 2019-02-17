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
        },
        options: null,

        initialize: function (options) {
            this.options = options;
        var that = this;
            $(this.$el).on('click','.editable-field-input',function() {
                var t = $(this);
                var input = $('<input>').attr('class', 'savable').val( t.text() );
                t.replaceWith( input );
                input.focus();
                that.$el.find('.save-options').show();

            });

            $(this.$el).on('blur','.savable',function() {
                var input = $(this);
                var value = input.val();
                if(value.length <= 0) {
                    alert('podaj wiecej znakow')
                    return false;
                }

                var t = $('<span>').attr('class', 'editable-field-input').text( value );
                var callback = that.options.action;
                callback.call(that.options.obj, value)
                input.replaceWith( t );
                that.$el.find('.overlay-icon').hide();
                that.$el.find('.save-options').hide();
            });
        },

        render: function () {
            this.options.id = this.options.id + '_field';
            this.$el.html(mustache.render(this.templates.editableContainer,this.options));
            // caching jQuery object is better than querying the DOM each time.
            return this;
        },
        cancel: function (e) {
            $(e.currentTarget).parent().hide()

        },
        mouseenter: function (e) {
            var $editableContainer = $(e.currentTarget);
            $editableContainer.find('.editable-container').css({'border':'1px solid lightgrey'});
            $(e.currentTarget).find('.overlay-icon').show();
        },
        onEdit: function (e) {
            console.log('onEdit')
            e.preventDefault();
        },


    });
return ContentEditableView;

});

